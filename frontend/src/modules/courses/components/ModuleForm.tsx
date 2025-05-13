import { useState } from 'react';
import { Modulo, Curso } from '../../../services/api';

interface ModuleFormProps {
  onSubmit: (data: Omit<Modulo, 'cod_modulo'>) => Promise<void>;
  initialData?: Omit<Modulo, 'cod_modulo'>;
  loading: boolean;
  cursos: Curso[];
}

export const ModuleForm = ({ onSubmit, initialData, loading, cursos }: ModuleFormProps) => {
  const [formData, setFormData] = useState<Omit<Modulo, 'cod_modulo'>>(
    initialData || {
      cod_curso: 0,
      titulo_modulo: '',
      descripcion_modulo: '',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cod_curso) {
      alert('Debes seleccionar un curso');
      return;
    }
    await onSubmit(formData);
  };

  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  const buttonClasses = "w-full bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors";
  const buttonDisabledClasses = "w-full bg-brand-500 text-brand-200 font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed";
  const labelClasses = "block text-sm font-medium mb-1 text-brand-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClasses}>Curso</label>
        <select
          value={formData.cod_curso || ''}
          onChange={(e) => setFormData({...formData, cod_curso: Number(e.target.value)})}
          className={inputClasses}
          required
        >
          <option value="">Selecciona un curso</option>
          {cursos.map((curso) => (
            <option key={curso.cod_curso} value={curso.cod_curso}>
              {curso.titulo_curso}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className={labelClasses}>Título del Módulo</label>
        <input
          type="text"
          value={formData.titulo_modulo}
          onChange={(e) => setFormData({...formData, titulo_modulo: e.target.value})}
          className={inputClasses}
          required
        />
      </div>
      
      <div>
        <label className={labelClasses}>Descripción del Módulo</label>
        <textarea
          value={formData.descripcion_modulo || ''}
          onChange={(e) => setFormData({...formData, descripcion_modulo: e.target.value})}
          className={inputClasses}
          rows={3}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || !formData.cod_curso}
        className={loading || !formData.cod_curso ? buttonDisabledClasses : buttonClasses}
      >
        {loading ? 'Procesando...' : initialData ? 'Actualizar Módulo' : 'Crear Módulo'}
      </button>
    </form>
  );
}; 