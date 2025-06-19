import { useState } from 'react';
import { Seccion, Modulo } from '../../../services/api';

interface SectionFormProps {
  onSubmit: (data: Omit<Seccion, 'cod_seccion'>) => Promise<void>;
  initialData?: Omit<Seccion, 'cod_seccion'>;
  loading: boolean;
  modulos: Modulo[];
}

export const SectionForm = ({ onSubmit, initialData, loading, modulos }: SectionFormProps) => {
  const [formData, setFormData] = useState<Omit<Seccion, 'cod_seccion'>>(
    initialData || {
      titulo_seccion: '',
      descripcion_seccion: '',
      cod_modulo: modulos[0]?.cod_modulo || 0,
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
        <label className={labelClasses}>Título de la Sección</label>
        <input
          type="text"
          value={formData.titulo_seccion}
          onChange={(e) => setFormData({...formData, titulo_seccion: e.target.value})}
          className={inputClasses}
          required
        />
      </div>
      
      <div>
        <label className={labelClasses}>Descripción de la Sección</label>
        <textarea
          value={formData.descripcion_seccion || ''}
          onChange={(e) => setFormData({...formData, descripcion_seccion: e.target.value})}
          className={inputClasses}
          rows={3}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={loading ? buttonDisabledClasses : buttonClasses}
      >
        {loading ? 'Procesando...' : initialData ? 'Actualizar Sección' : 'Crear Sección'}
      </button>
    </form>
  );
}; 