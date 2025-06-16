import { useState } from 'react';
import { Curso } from '../../../services/api';

interface CourseFormProps {
  onSubmit: (data: FormData) => Promise<void>; 
  initialData?: Omit<Curso, 'cod_curso'>;
  loading: boolean;
}

export const CourseForm = ({ onSubmit, initialData, loading }: CourseFormProps) => {
  const [formData, setFormData] = useState<Omit<Curso, 'cod_curso'> & { imagen_curso: File | null }>(
    initialData || {
      titulo_curso: '',
      descripcion_curso: '',
      imagen_curso: null,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('titulo_curso', formData.titulo_curso);
    form.append('descripcion_curso', formData.descripcion_curso || '');

    if (formData.imagen_curso) {
      form.append('imagen_curso', formData.imagen_curso);  // Añadir el archivo de imagen
    }

    // Llamar a la función onSubmit para enviar los datos del formulario
    await onSubmit(form); 
  };

  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  const buttonClasses = "w-full bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors";
  const buttonDisabledClasses = "w-full bg-brand-500 text-brand-200 font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed";
  const labelClasses = "block text-sm font-medium mb-1 text-brand-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClasses}>Título del Curso</label>
        <input
          type="text"
          value={formData.titulo_curso}
          onChange={(e) => setFormData({ ...formData, titulo_curso: e.target.value })}
          className={inputClasses}
          required
        />
      </div>
      
      <div>
        <label className={labelClasses}>Descripción del Curso</label>
        <textarea
          value={formData.descripcion_curso || ''}
          onChange={(e) => setFormData({ ...formData, descripcion_curso: e.target.value })}
          className={inputClasses}
          rows={3}
        />
      </div>
      
      <div>
        <label htmlFor="imagen" className="block text-sm font-medium text-[#E2E8F0] mb-1">
          Imagen
        </label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, imagen_curso: e.target.files?.[0] || null })}
          className="w-full px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={loading ? buttonDisabledClasses : buttonClasses}
      >
        {loading ? 'Procesando...' : initialData ? 'Actualizar Curso' : 'Crear Curso'}
      </button>
    </form>
  );
}; 