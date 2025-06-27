import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCurso } from "../hooks/useCreateCurso";

const CrearCursoPage = () => {
  const navigate = useNavigate();
  const { createCurso, loading, error, success } = useCreateCurso();

  const [formData, setFormData] = useState({
    titulo_curso: "",
    descripcion_curso: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCurso(
      formData.titulo_curso,
      formData.descripcion_curso,
      selectedImage || undefined
    );
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-lime border-5 border-black shadow-brutal-xl p-8 text-center animate-bounce">
          <span className="font-brutal text-3xl">
            ✅ CURSO CREADO EXITOSAMENTE!
          </span>
        </div>
        <button
          onClick={() => navigate("/cursos")}
          className="bg-neo-cyan border-4 border-black shadow-brutal-lg px-8 py-4 font-brutal text-xl hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
        >
          VER TODOS LOS CURSOS
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Título */}
      <div className="bg-neo-indigo rounded-lg border-5 border-black shadow-brutal-xl p-8 mb-8">
        <h1 className="font-brutal text-4xl text-white mb-2">
          CREAR NUEVO CURSO
        </h1>
        <p className="text-xl font-bold text-white">
          Completa la información para crear tu curso
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Título del curso */}
        <div className="bg-neo-lavender rounded-lg shadow-brutal-lg p-6">
          <label className="block font-brutal text-xl mb-4">
            📚 TÍTULO DEL CURSO
          </label>
          <input
            type="text"
            name="titulo_curso"
            value={formData.titulo_curso}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
            placeholder="Escribe el título del curso..."
          />
        </div>

        {/* Descripción */}
        <div className="bg-neo-lavender rounded-lg shadow-brutal-lg p-6">
          <label className="block font-brutal text-xl mb-4">
            📝 DESCRIPCIÓN
          </label>
          <textarea
            name="descripcion_curso"
            value={formData.descripcion_curso}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"

            placeholder="Describe de qué trata el curso..."
          />
        </div>

        {/* Imagen */}
        <div className="bg-neo-lavender rounded-lg shadow-brutal-lg p-6">
          <label className="block font-brutal text-xl mb-4">
            🖼️ IMAGEN DEL CURSO
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-neo-lavender font-bold text-lg  file:bg-neo-orange file:px-4 file:py-2 file:font-brutal file:border-3 file:border-black file:shadow-brutal file:mr-4"
          />

          {/* Preview de la imagen */}
          {imagePreview && (
            <div className="mt-6 border-3 border-black shadow-brutal bg-white p-4">
              <p className="font-brutal text-lg mb-3">PREVIEW:</p>
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
          <div className="bg-neo-red border-4 border-black shadow-brutal p-6">
            <span className="font-brutal text-xl text-white">
              ❌ ERROR: {error}
            </span>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={() => navigate("/cursos")}
            className="bg-neo-sage rounded-lg  shadow-brutal-lg px-8 py-4 font-brutal text-xl hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            ← CANCELAR
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`rounded-lg shadow-brutal-lg px-8 py-4 font-brutal text-xl transition-all duration-100 hover:shadow-brutal-xl hover:translate-x-1 hover:translate-y-1 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-neo-lime hover:bg-neo-green"
            }`}
          >
            {loading ? "⏳ CREANDO..." : "✅ CREAR CURSO"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCursoPage;
