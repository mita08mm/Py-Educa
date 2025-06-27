import React, { useState, useEffect } from "react";
import { useCreateContenido } from "../../hooks/useCreateContenido";
import { getYouTubeThumbnail } from "../../utils/youtubeUtils";
import { useSubseccionDatos } from "../../hooks/useSubseccionDatos";

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

  const { subseccionDatos } = useSubseccionDatos(subseccionId);
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
  }, [success, onContenidoCreated]);

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

    if (!subseccionDatos) {
      return;
    }

    const submitData = new FormData();
    submitData.append("cod_modulo", subseccionDatos.cod_modulo.toString());
    submitData.append("cod_seccion", subseccionDatos.cod_seccion.toString());
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
    setFormData({
      descripcion: "",
      link: "",
    });
    setSelectedImage(null);
    setImagePreview(null);
    setYoutubePreview(null);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-periwinkle rounded-lg shadow-brutal-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-lavender border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-white mb-1">
                AGREGAR CONTENIDO
              </h2>
              <p className="font-bold text-white">
                Para subsección: {subseccionTitulo}
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
                  ✅ CONTENIDO AGREGADO EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Descripción */}
              <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  📝 DESCRIPCIÓN DEL CONTENIDO
                </h3>
                <div>
                  <label className="block font-brutal text-lg mb-3">
                    ✏️ DESCRIPCIÓN
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                    placeholder="Explica el contenido de esta lección y qué aprenderán los estudiantes..."
                  />
                </div>
              </div>

              {/* Video de YouTube */}
              <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  📹 VIDEO EDUCATIVO
                </h3>
                <div>
                  <label className="block font-brutal text-lg mb-3">
                    🎬 ENLACE DE YOUTUBE (OPCIONAL)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  
                  {/* Preview del video de YouTube */}
                  {youtubePreview && (
                    <div className="mt-4 bg-neo-sage rounded-lg shadow-brutal p-4">
                      <p className="font-brutal text-lg mb-3">
                        🎥 PREVIEW DEL VIDEO:
                      </p>
                      <img
                        src={youtubePreview}
                        alt="YouTube Preview"
                        className="max-w-xs max-h-32 rounded-lg border-3 border-black shadow-brutal"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Imagen adicional */}
              <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  🖼️ IMAGEN COMPLEMENTARIA
                </h3>
                <div>
                  <label className="block font-brutal text-lg mb-3">
                    📸 IMAGEN ADICIONAL (OPCIONAL)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream file:bg-neo-orange file:px-4 file:py-2 file:font-brutal file:border-2 file:border-black file:rounded file:shadow-brutal file:mr-4 file:text-black focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                  />

                  {/* Preview de la imagen */}
                  {imagePreview && (
                    <div className="mt-4 bg-neo-sage rounded-lg shadow-brutal p-4">
                      <p className="font-brutal text-lg mb-3">
                        🖼️ PREVIEW DE LA IMAGEN:
                      </p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-xs max-h-48 rounded-lg border-3 border-black shadow-brutal"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  ℹ️ INFORMACIÓN IMPORTANTE
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">📝</span>
                    <span className="font-bold">
                      La descripción ayuda a los estudiantes a entender el objetivo del contenido
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">📹</span>
                    <span className="font-bold">
                      Los videos de YouTube se reproducen directamente en la plataforma
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">🖼️</span>
                    <span className="font-bold">
                      Las imágenes complementan y refuerzan el aprendizaje visual
                    </span>
                  </div>
                </div>
              </div>

              {/* Flujo de contenido */}
              <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  🚀 TIPOS DE CONTENIDO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neo-sage rounded-lg shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">📝</div>
                    <div className="font-bold text-sm">TEXTO EXPLICATIVO</div>
                    <div className="text-xs mt-1">
                      Descripción clara del contenido
                    </div>
                  </div>
                  <div className="bg-neo-sage rounded-lg shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">🎬</div>
                    <div className="font-bold text-sm">VIDEO EDUCATIVO</div>
                    <div className="text-xs mt-1">
                      Material audiovisual de apoyo
                    </div>
                  </div>
                  <div className="bg-neo-sage rounded-lg shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">🖼️</div>
                    <div className="font-bold text-sm">IMAGEN COMPLEMENTARIA</div>
                    <div className="text-xs mt-1">
                      Apoyo visual adicional
                    </div>
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
                  {loading ? "⏳ GUARDANDO..." : "📚 AGREGAR CONTENIDO"}
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