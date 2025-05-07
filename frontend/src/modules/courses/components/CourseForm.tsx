// Formulario para crear un curso
import { useState, ChangeEvent } from 'react';
import { useCourseCreation } from '../hooks/useCourseCreation';
import { FiUpload as UploadIcon } from 'react-icons/fi';

interface CourseFormProps {
  setPreviewImage: (image: string | null) => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ setPreviewImage }) => {
  const { saveCourse } = useCourseCreation();
  
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [localPreviewImage, setLocalPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) { // Limitar a 2MB
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setLocalPreviewImage(imageData);
        setPreviewImage(imageData); // Pasando la imagen al componente padre
      };
      reader.readAsDataURL(file);
    } else {
      alert('Sube una imagen menor a 2MB');
    }
  };

  const handleSaveCourse = () => {
    if (courseTitle.trim()) {
      setIsSubmitting(true);
      saveCourse({ title: courseTitle, description: courseDescription });
      setCourseTitle('');
      setCourseDescription('');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl text-[#E2E8F0] font-bold">Crear Curso</h2>
      
      <div>
        <label className="block text-[#E2E8F0] mb-1">Título del Curso</label>
        <input
          type="text"
          placeholder="Ej: Introducción a Python"
          className="w-full p-2 border border-gray-600 rounded bg-[#1E293B] text-white"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-[#E2E8F0] mb-1">Descripción del Curso</label>
        <textarea
          placeholder="Describe el contenido del curso"
          className="w-full p-2 border border-gray-600 rounded bg-[#1E293B] text-white min-h-[100px]"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-[#E2E8F0] mb-1">Imagen del Curso</label>
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-[#1E293B] hover:bg-[#1E293B]/80 transition">
          {localPreviewImage ? (
            <div className="relative w-full h-full">
              <img 
                src={localPreviewImage} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocalPreviewImage(null);
                  setPreviewImage(null);
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <UploadIcon className="w-8 h-8 mb-2" />
              <p className="text-sm">Click para subir imagen</p>
              <p className="text-xs mt-1">Formatos: JPG, PNG (Max. 2MB)</p>
            </div>
          )}
          <input 
            type="file" 
            className="hidden" 
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <button
        onClick={handleSaveCourse}
        className="w-full bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-3 rounded-lg disabled:opacity-50 transition mt-6"
        disabled={!courseTitle.trim() || isSubmitting}
      >
        {isSubmitting ? 'Creando...' : 'Crear Curso'}
      </button>
    </div>
  );
};
