import { useState } from 'react';
import TemplateEditorWindow from '../../codeEditor/components/TemplateEditorWindow';

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

interface EvaluationFormProps {
  onSubmit: (data: EvaluationData & { problems: Problem[] }) => void;
  onCancel: () => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSubmit, onCancel }) => {
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

  const handleSubmit = (): void => {
    const evaluationComplete = {
      ...evaluationData,
      problems: problems
    };
    onSubmit(evaluationComplete);
  };

  const canSubmit: boolean = evaluationData.title !== '' && evaluationData.description !== '' && problems.length > 0;

  // Clases de estilos reutilizables actualizadas con los colores del ModuleForm
  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  const textareaClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none min-h-32";
  const cardClasses = "bg-brand-700 rounded-lg p-6 border border-brand-500";
  const buttonPrimaryClasses = "px-4 py-2 rounded-md bg-brand-400 hover:bg-brand-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonSecondaryClasses = "px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-400 text-brand-100 transition-colors";
  const buttonDangerClasses = "text-red-400 hover:text-red-300 text-sm transition-colors";
  const labelClasses = "block text-sm font-medium mb-1 text-brand-100";

  return (
    <div className="bg-brand-800 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className={cardClasses}>
          <h1 className="text-2xl font-bold text-brand-100 mb-6">Crear nueva evaluación</h1>
          
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
            />
          </div>

          {/* Botones de acción principal */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className={buttonSecondaryClasses}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={buttonPrimaryClasses}
            >
              Guardar Evaluación
            </button>
          </div>
        </div>

        {/* Vista previa de la evaluación */}
        {evaluationData.title && (
          <div className={cardClasses}>
            <h2 className="text-xl font-bold text-brand-100 mb-4">Evaluación de Programación</h2>
            <div className="mb-4">
              <label className={labelClasses}>Título</label>
              <div className="w-full p-2 rounded-md bg-brand-600 border border-brand-500 text-brand-100">
                {evaluationData.title}
              </div>
            </div>
            <div>
              <label className={labelClasses}>Descripción</label>
              <div className="w-full p-2 rounded-md bg-brand-600 border border-brand-500 text-brand-100 min-h-[60px] whitespace-pre-wrap">
                {evaluationData.description}
              </div>
            </div>
          </div>
        )}

        {/* Problemas de la Evaluación */}
        <div className={cardClasses}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-brand-100">Problemas de la Evaluación</h3>
            <button
              type="button"
              onClick={() => setShowProblemForm(true)}
              className="bg-brand-400 hover:bg-brand-500 text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center"
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
                >
                  ✕
                </button>
              </div>
              <p className="text-brand-200 text-sm mb-3">{problem.description}</p>
              
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
                <label className="block text-brand-200 text-xs mb-2">Plantilla de Código</label>
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
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={addProblem}
                  disabled={!currentProblem.title || !currentProblem.description || !currentProblem.template}
                  className={buttonPrimaryClasses}
                >
                  Guardar Problema
                </button>
              </div>
            </div>
          )}

          {problems.length === 0 && !showProblemForm && (
            <div className="text-center py-8">
              <p className="text-brand-200">No hay problemas agregados aún</p>
              <p className="text-brand-300 text-sm">Haz clic en "Añadir Problema" para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};