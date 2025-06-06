import { useState } from 'react';
import { Subseccion, Seccion } from '../../../services/api';

interface SubsectionFormProps {
  onSubmit: (data: Omit<Subseccion, 'cod_subseccion'>) => Promise<void>;
  initialData?: Omit<Subseccion, 'cod_subseccion'>;
  loading: boolean;
  secciones: Seccion[];
}

export const SubsectionForm = ({ onSubmit, initialData, loading, secciones }: SubsectionFormProps) => {
  const [formData, setFormData] = useState<Omit<Subseccion, 'cod_subseccion'>>(
    initialData || {
      titulo_subseccion: '',
      descripcion_subseccion: '',
      cod_seccion: secciones[0]?.cod_seccion || 0,
      cod_modulo: secciones[0]?.cod_modulo || 0
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
        <label className={labelClasses}>Título de la Subsección</label>
        <input
          type="text"
          value={formData.titulo_subseccion}
          onChange={(e) => setFormData({...formData, titulo_subseccion: e.target.value})}
          className={inputClasses}
          required
        />
      </div>
      
      <div>
        <label className={labelClasses}>Descripción de la Subsección</label>
        <textarea
          value={formData.descripcion_subseccion || ''}
          onChange={(e) => setFormData({...formData, descripcion_subseccion: e.target.value})}
          className={inputClasses}
          rows={3}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={loading ? buttonDisabledClasses : buttonClasses}
      >
        {loading ? 'Procesando...' : initialData ? 'Actualizar Subsección' : 'Crear Subsección'}
      </button>
    </form>
  );
}; 