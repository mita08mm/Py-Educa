import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EvaluationForm } from '../components/EvaluationForm';

interface Problem {
  id: number;
  title: string;
  description: string;
  input: string;
  output: string;
}

interface EvaluationData {
  title: string;
  description: string;
  problems: Problem[];
}

interface EvaluationPayload extends EvaluationData {
  modulo_id: string;
  curso_id: string;
  fecha_creacion: string;
  estado: string;
}

export const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener parámetros de la URL
  const moduloId: string | null = searchParams.get('modulo');
  const cursoId: string | null = searchParams.get('curso');

  useEffect(() => {
    // Validar que existan los parámetros necesarios
    if (!moduloId || !cursoId) {
      setError('Parámetros de módulo y curso son requeridos');
    }
  }, [moduloId, cursoId]);

  const handleSubmitEvaluation = async (evaluationData: EvaluationData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Aquí harías la llamada a tu API para crear la evaluación
      const evaluationPayload: EvaluationPayload = {
        ...evaluationData,
        modulo_id: moduloId!,
        curso_id: cursoId!,
        fecha_creacion: new Date().toISOString(),
        estado: 'activa'
      };

      console.log('Datos de evaluación a enviar:', evaluationPayload);

      // Simulación de llamada API
      // const response = await fetch('/api/evaluations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(evaluationPayload)
      // });

      // if (!response.ok) {
      //   throw new Error('Error al crear la evaluación');
      // }

      // const result = await response.json();

      // Simulación de éxito
      setTimeout(() => {
        setLoading(false);
        alert('Evaluación creada exitosamente');
        // Redirigir de vuelta al módulo
        navigate(`/modulos/${moduloId}?curso=${cursoId}`);
      }, 1000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la evaluación';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    // Redirigir de vuelta al módulo sin guardar
    navigate(`/modulos/${moduloId}?curso=${cursoId}`);
  };

  if (error) {
    return (
      <div className="bg-brand-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-4 bg-red-900 rounded-md text-white">
            <h2 className="font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-3 px-4 py-2 rounded-md bg-red-800 hover:bg-red-700 text-white transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-brand-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-800 rounded-lg p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-400"></div>
              <span className="ml-3 text-brand-100">Guardando evaluación...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EvaluationForm
      onSubmit={handleSubmitEvaluation}
      onCancel={handleCancel}
    />
  );
};
