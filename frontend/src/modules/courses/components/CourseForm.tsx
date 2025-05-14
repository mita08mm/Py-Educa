import { useState } from 'react';
import { Curso } from '../../../services/api';

interface CourseFormProps {
  onSubmit: (data: Omit<Curso, 'cod_curso'>) => Promise<void>;
  initialData?: Omit<Curso, 'cod_curso'>;
  loading: boolean;
}

export const CourseForm = ({ onSubmit, initialData, loading }: CourseFormProps) => {
  const [formData, setFormData] = useState<Omit<Curso, 'cod_curso'>>(
    initialData || {
      titulo_curso: '',
      descripcion_curso: '',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
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