import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TemplateEditorWindow from '../../codeEditor/components/TemplateEditorWindow';
import { evaluacionService } from '../../../services/api';

interface Problem {
  id: number;
  title: string;
  description: string;
  input?: string;
  output?: string;
  template: string;
}

interface EvaluationData {
  title: string;
  description: string;
  problems?: Problem[];
}

// Interfaz para la API (según el formato requerido)
interface Evaluacion {
  cod_modulo: number;
  titulo_seccion: string;
  descripcion_seccion: string;
}

interface EvaluationFormProps {
  onSubmit: (data: EvaluationData & { problems: Problem[] }) => void;
  onCancel: () => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSubmit, onCancel }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Obtener parámetros del URL
  const moduloId = searchParams.get('modulo');
  const cursoId = searchParams.get('curso');

  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    title: '',
    description: ''
  });

  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState<Omit<Problem, 'id'>>({
    title: '',
    description: '',
    input: '',
    output: '',
    template: '# Escribe tu código aquí\n# Las líneas marcadas con # STATIC no podrán ser editadas por los estudiantes\n\ndef solucion():\n    pass  # STATIC'
  });

  const [showProblemForm, setShowProblemForm] = useState<boolean>(false);

  // Verificar que tenemos los parámetros necesarios
  useEffect(() => {
    if (!moduloId) {
      setError('Falta el parámetro requerido: modulo');
    }
  }, [moduloId]);

  const handleEvaluationChange = (field: keyof EvaluationData, value: string): void => {
    setEvaluationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProblemChange = (field: keyof Omit<Problem, 'id'>, value: string): void => {
    setCurrentProblem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateChange = (value: string): void => {
    setCurrentProblem(prev => ({
      ...prev,
      template: value
    }));
  };

  const addProblem = (): void => {
    if (currentProblem.title && currentProblem.description && currentProblem.template) {
      setProblems(prev => [...prev, { ...currentProblem, id: Date.now() }]);
      setCurrentProblem({
        title: '',
        description: '',
        input: '',
        output: '',
        template: '# Escribe tu código aquí\n# Las líneas marcadas con # STATIC no podrán ser editadas por los estudiantes\n\ndef solucion():\n    pass  # STATIC'
      });
      setShowProblemForm(false);
    }
  };

  const removeProblem = (problemId: number): void => {
    setProblems(prev => prev.filter(p => p.id !== problemId));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!moduloId) {
      setError('Falta el parámetro módulo requerido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Transformar los datos al formato esperado por la API
      const evaluacionData: Evaluacion = {
        cod_modulo: parseInt(moduloId),
        titulo_seccion: evaluationData.title,
        descripcion_seccion: evaluationData.description
      };

       console.log('DATOS EVALUACIÓN');
       console.log('Datos de la evaluación:', evaluacionData);
       console.log('Problemas asociados:', problems);
       console.log('Número total de problemas:', problems.length);
       console.log('Datos evaluación juntos:', {
       evaluacion: evaluacionData,
       problems: problems,
       totalProblems: problems.length
    });
    
    const response = await evaluacionService.create(evaluacionData);
      
      // Llamar al callback con los datos completos
      const evaluationComplete = {
        ...evaluationData,
        problems: problems
      };
      
      console.log('Evaluación creada exitosamente:', response);
      
      // Solo llamar al callback, no navegar aquí
      onSubmit(evaluationComplete);
      
    } catch (err) {
      console.error('Error al crear la evaluación:', err);
      setError('Error al crear la evaluación. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit: boolean = evaluationData.title !== '' && evaluationData.description !== '' && problems.length > 0 && !isLoading;

  // Clases de estilos reutilizables actualizadas con los colores del ModuleForm
  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  const textareaClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none min-h-32";
  const cardClasses = "bg-brand-700 rounded-lg p-6 border border-brand-500";
  const buttonPrimaryClasses = "px-4 py-2 rounded-md bg-brand-400 hover:bg-brand-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonSecondaryClasses = "px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-400 text-brand-100 transition-colors";
  const buttonDangerClasses = "text-red-400 hover:text-red-300 text-sm transition-colors";
  const labelClasses = "block text-sm font-medium mb-1 text-brand-100";

  // Mostrar error si faltan parámetros
  if (error && !moduloId) {
    return (
      <div className="bg-brand-800 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className={cardClasses}>
            <div className="text-center py-8">
              <div className="text-red-400 text-lg font-semibold mb-4">Error</div>
              <p className="text-brand-200 mb-4">{error}</p>
              <button
                onClick={onCancel}
                className={buttonSecondaryClasses}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-800 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-brand-100">Crear nueva evaluación</h1>
            <div className="text-sm text-brand-300">
              Módulo: {moduloId}
            </div>
          </div>
          
          {/* Mostrar error si existe */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          {/* Título */}
          <div className="mb-4">
            <label htmlFor="title" className={labelClasses}>Título</label>
            <input
              type="text"
              id="title"
              value={evaluationData.title}
              onChange={(e) => handleEvaluationChange('title', e.target.value)}
              className={inputClasses}
              placeholder="Ingrese el título de la evaluación"
              disabled={isLoading}
            />
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label htmlFor="description" className={labelClasses}>Descripción</label>
            <textarea
              id="description"
              value={evaluationData.description}
              onChange={(e) => handleEvaluationChange('description', e.target.value)}
              className={textareaClasses}
              placeholder="Ingrese la descripción de la evaluación"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Botones de acción principal */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className={buttonSecondaryClasses}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={buttonPrimaryClasses}
            >
              {isLoading ? 'Guardando...' : 'Guardar Evaluación'}
            </button>
          </div>
        </div>

        {/* Problemas de la Evaluación */}
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-brand-100">Problemas de la Evaluación</h3>
            <button
              type="button"
              onClick={() => setShowProblemForm(true)}
              className="bg-brand-400 hover:bg-brand-500 text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center disabled:opacity-50"
              disabled={isLoading}
            >
              <span className="mr-1">+</span> Añadir Problema
            </button>
          </div>

          {/* Lista de problemas existentes */}
          {problems.map((problem) => (
            <div key={problem.id} className="bg-brand-600 rounded-lg p-4 mb-4 border border-brand-500">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-brand-100 font-semibold">{problem.title}</h4>
                <button
                  type="button"
                  onClick={() => removeProblem(problem.id)}
                  className={buttonDangerClasses}
                  disabled={isLoading}
                >
                  ✕
                </button>
              </div>
              <p className="text-brand-100 text-sm mb-3">{problem.description}</p>
              
              {/* Input y Output opcionales */}
              {(problem.input || problem.output) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {problem.input && (
                    <div>
                      <label className="block text-brand-200 text-xs mb-1">Entrada (Input)</label>
                      <div className="bg-brand-700 rounded-md px-3 py-2 text-brand-100 text-sm min-h-[40px] border border-brand-500">
                        {problem.input}
                      </div>
                    </div>
                  )}
                  {problem.output && (
                    <div>
                      <label className="block text-brand-200 text-xs mb-1">Salida (Output)</label>
                      <div className="bg-brand-700 rounded-md px-3 py-2 text-brand-100 text-sm min-h-[40px] border border-brand-500">
                        {problem.output}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Plantilla de código */}
              <div>
                <label className="block text-brand-100 mb-2">Plantilla de Código</label>
                <div className="border border-brand-500 rounded-md overflow-hidden">
                  <TemplateEditorWindow
                    value={problem.template}
                    height="300px"
                    onChange={() => {}} // Solo lectura en la vista previa
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Formulario para nuevo problema */}
          {showProblemForm && (
            <div className="bg-brand-600 rounded-lg p-4 mb-4 border border-brand-500">
              <h4 className="text-brand-100 font-semibold mb-3">Nuevo Problema</h4>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="problem-title" className={labelClasses}>Título del Problema *</label>
                  <input
                    type="text"
                    id="problem-title"
                    value={currentProblem.title}
                    onChange={(e) => handleProblemChange('title', e.target.value)}
                    className={inputClasses}
                    placeholder="Ej: Suma de Arrays"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="problem-description" className={labelClasses}>Descripción del Problema *</label>
                  <textarea
                    id="problem-description"
                    value={currentProblem.description}
                    onChange={(e) => handleProblemChange('description', e.target.value)}
                    className={textareaClasses}
                    placeholder="Descripción detallada del problema"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="problem-input" className={labelClasses}>Entrada (Input) <span className="text-brand-300 text-xs">(Opcional)</span></label>
                    <textarea
                      id="problem-input"
                      value={currentProblem.input}
                      onChange={(e) => handleProblemChange('input', e.target.value)}
                      className="w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none min-h-20 resize-none"
                      placeholder="Formato de entrada esperado (opcional)"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="problem-output" className={labelClasses}>Salida (Output) <span className="text-brand-300 text-xs">(Opcional)</span></label>
                    <textarea
                      id="problem-output"
                      value={currentProblem.output}
                      onChange={(e) => handleProblemChange('output', e.target.value)}
                      className="w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none min-h-20 resize-none"
                      placeholder="Formato de salida esperado (opcional)"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Editor de plantilla de código */}
                <div>
                  <label className={labelClasses}>Plantilla de Código *</label>
                  <p className="text-brand-300 text-xs mb-2">
                    Crea la plantilla base para el problema. Las líneas marcadas con # STATIC no podrán ser editadas por los estudiantes.
                  </p>
                  <div className="border border-brand-500 rounded-md overflow-hidden">
                    <TemplateEditorWindow
                      value={currentProblem.template}
                      onChange={handleTemplateChange}
                      height="400px"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProblemForm(false);
                    setCurrentProblem({
                      title: '',
                      description: '',
                      input: '',
                      output: '',
                      template: '# Escribe tu código aquí\n# Las líneas marcadas con # STATIC no podrán ser editadas por los estudiantes\n\ndef solucion():\n    pass  # STATIC'
                    });
                  }}
                  className={buttonSecondaryClasses}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={addProblem}
                  disabled={!currentProblem.title || !currentProblem.description || !currentProblem.template || isLoading}
                  className={buttonPrimaryClasses}
                >
                  Guardar Problema
                </button>
              </div>
            </div>
          )}

          {problems.length === 0 && !showProblemForm && (
            <div className="text-center py-8">
              <p className="text-brand-100">No hay problemas agregados aún</p>
              <p className="text-brand-300 text-sm">Haz clic en "Añadir Problema" para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};