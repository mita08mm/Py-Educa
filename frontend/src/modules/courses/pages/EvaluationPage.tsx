// pages/EvaluationPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { evaluacionService, moduloService, cursoService, Modulo, Curso } from '../../../services/api';
import { Layout } from '../../layout';
import { EvaluationForm } from '../components/EvaluationForm';

export const EvaluationPage = () => {
  const [searchParams] = useSearchParams();
  const moduloId = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  const cursoId = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;
  
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true); // Estado para controlar la carga inicial de datos
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [curso, setCurso] = useState<Curso | null>(null);
  
  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      setLoadingData(true);
      
      if (moduloId) {
        await cargarModulo();
      }
      
      if (cursoId) {
        await cargarCurso();
      }
      
      setLoadingData(false);
    };
    
    cargarDatos();
  }, [moduloId, cursoId]);
  
  // Cargar información del módulo
  const cargarModulo = async () => {
    if (!moduloId) return;
    try {
      const data = await moduloService.getOne(moduloId);
      setModulo(data);
    } catch (error) {
      console.error('Error al cargar módulo:', error);
    }
  };
  
  // Cargar información del curso
  const cargarCurso = async () => {
    if (!cursoId) return;
    try {
      const data = await cursoService.getCourse(cursoId);
      setCurso(data);
    } catch (error) {
      console.error('Error al cargar curso:', error);
    }
  };
  
  // Guardar evaluación
  const guardarEvaluacion = async (data: any) => {
    try {
      setLoading(true);
      await evaluacionService.create({
        ...data,
        cod_modulo: moduloId || 0,
      });
      
      // Redirigir a la página de módulos
      navigate(`/modules?curso=${cursoId}`);
    } catch (error) {
      console.error('Error al guardar evaluación:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  if (!moduloId || !cursoId) {
    return (
      <Layout>
        <div className="p-4">
          <div className="container mx-auto">
            <div className="bg-red-900 text-white p-4 rounded-md">
              Error: Se requieren los IDs del módulo y curso para crear una evaluación.
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate(-1)}
                className="text-brand-400 hover:text-brand-300"
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-100">Crear Nueva Evaluación</h1>
              {modulo && curso && (
                <p className="text-brand-100 mt-2">
                  Curso: {curso.titulo_curso} | Módulo: {modulo.titulo_modulo}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate(`/modules?curso=${cursoId}`)}
              className="text-brand-400 hover:text-brand-300"
            >
              Volver a Módulos
            </button>
          </div>
          
          <div className="bg-surface p-6 rounded-lg shadow-lg border border-brand-600">
            {loadingData ? (
              <p className="text-center py-4 text-brand-100">Cargando...</p>
            ) : (
              <EvaluationForm
                onSubmit={guardarEvaluacion}
                loading={loading}
                codModulo={moduloId || 0}
              />
            )}
          </div>
          
          <div className="mt-4 text-sm text-brand-300">
            <p>
              Las evaluaciones te permiten crear ejercicios de programación para tus estudiantes.
              Puedes especificar el formato de entrada y salida esperados, así como ejemplos para guiar a los estudiantes.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};