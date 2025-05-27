import { useState } from 'react';
import { Evaluacion } from '../../../services/api';

interface EvaluationFormProps {
  onSubmit: (data: Omit<Evaluacion, 'cod_evaluacion'>) => Promise<void>;
  loading: boolean;
  codModulo: number;
  initialData?: Omit<Evaluacion, 'cod_evaluacion'>;
}

export const EvaluationForm = ({
  onSubmit,
  loading,
  codModulo,
  initialData
}: EvaluationFormProps) => {
  const [formData, setFormData] = useState<Omit<Evaluacion, 'cod_evaluacion'>>({
    cod_modulo: codModulo,
    titulo_evaluacion: initialData?.titulo_evaluacion || '',
    descripcion_evaluacion: initialData?.descripcion_evaluacion || '',
    input: initialData?.input || '',
    output: initialData?.output || '',
    input_ejemplo: initialData?.input_ejemplo || '',
    output_ejemplo: initialData?.output_ejemplo || '',
    codigo: initialData?.codigo || '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.titulo_evaluacion.trim()) {
      setError('El título de la evaluación es obligatorio');
      return;
    }
    
    try {
      await onSubmit(formData);
      
      // Limpiar el formulario si es uno nuevo
      if (!initialData) {
        setFormData({
          cod_modulo: codModulo,
          titulo_evaluacion: '',
          descripcion_evaluacion: '',
          input: '',
          output: '',
          input_ejemplo: '',
          output_ejemplo: '',
          codigo: '',
        });
      }
    } catch (err) {
      setError('Error al guardar la evaluación. Inténtalo de nuevo.');
      console.error(err);
    }
  };

  const inputClasses = "w-full p-3 rounded-md bg-brand-600 border border-brand-600 text-brand-100 focus:outline-none focus:border-brand-400";
  const textareaClasses = "w-full p-3 rounded-md bg-brand-600 border border-brand-600 text-brand-100 focus:outline-none focus:border-brand-400 min-h-32";
  const codeTextareaClasses = "w-full p-3 rounded-md bg-brand-600 border border-brand-600 text-brand-100 font-mono focus:outline-none focus:border-brand-400 min-h-48";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-900 rounded-md text-white">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="titulo_evaluacion" className="block mb-1 text-brand-100">
          Título
        </label>
        <input
          type="text"
          id="titulo_evaluacion"
          name="titulo_evaluacion"
          value={formData.titulo_evaluacion}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Título de la evaluación"
        />
      </div>
      
      <div>
        <label htmlFor="descripcion_evaluacion" className="block mb-1 text-brand-100">
          Descripción
        </label>
        <textarea
          id="descripcion_evaluacion"
          name="descripcion_evaluacion"
          value={formData.descripcion_evaluacion}
          onChange={handleChange}
          className={textareaClasses}
          placeholder="Descripción detallada de la evaluación"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label htmlFor="input" className="block mb-1 text-brand-100">
            Input
          </label>
          <textarea
            id="input"
            name="input"
            value={formData.input}
            onChange={handleChange}
            className={textareaClasses}
            placeholder="Formato del input esperado"
          />
        </div>
        
        <div>
          <label htmlFor="output" className="block mb-1 text-brand-100">
            Output
          </label>
          <textarea
            id="output"
            name="output"
            value={formData.output}
            onChange={handleChange}
            className={textareaClasses}
            placeholder="Formato del output esperado"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="input_ejemplo" className="block mb-1 text-brand-100">
            Input Ejemplo
          </label>
          <textarea
            id="input_ejemplo"
            name="input_ejemplo"
            value={formData.input_ejemplo}
            onChange={handleChange}
            className={textareaClasses}
            placeholder="Ejemplo de input"
          />
        </div>
        
        <div>
          <label htmlFor="output_ejemplo" className="block mb-1 text-brand-100">
            Output Ejemplo
          </label>
          <textarea
            id="output_ejemplo"
            name="output_ejemplo"
            value={formData.output_ejemplo}
            onChange={handleChange}
            className={textareaClasses}
            placeholder="Ejemplo de output"
          />
        </div>
      </div>
      
      <div>
        
        <label htmlFor="codigo" className="block mb-1 text-brand-100">
        <div className="flex items-center justify-between">
            <span>Código</span>
            <div className="flex space-x-3">
            <button 
                type="button"
                className="bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-brand-500"
                onClick={() => setFormData(prev => ({ ...prev, codigo: '' }))}
            >
                Limpiar
            </button>
            <button
                type="button"
                className="px-4 py-2 rounded-md bg-brand-400 text-white hover:bg-brand-500"
                onClick={() => console.log('Correr código')}
            >
                Correr Código
            </button>
            </div>
        </div>
        </label>
        <div className="relative">
          <textarea
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className={codeTextareaClasses}
            placeholder="Código de la evaluación"
          />
          <div className="absolute right-2 bottom-2 flex space-x-2">
            
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-brand-400 text-white hover:bg-brand-500"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Evaluación'}
        </button>
      </div>
    </form>
  );
};