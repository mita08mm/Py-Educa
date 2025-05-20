import { useState, useEffect } from 'react';
import { cursoService, Curso } from '../../../services/api';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout';
import { CourseForm } from '../components/CourseForm';

export const CreateCoursePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cursos, setCursos] = useState<Curso[]>([]);
  
  // Cargar datos al iniciar
  useEffect(() => {
    cargarCursos();
  }, []);
  
  // Cargar cursos
  const cargarCursos = async () => {
    try {
      setLoading(true);
      const data = await cursoService.getAll();
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo curso
  const crearCurso = async (data: Omit<Curso, 'cod_curso'>) => {
    try {
      setLoading(true);
      const nuevoCurso = await cursoService.createCourse(data);
      setCursos([...cursos, nuevoCurso]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear curso:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const cardClasses = "bg-surface p-6 rounded-lg shadow-lg border border-brand-600";
  const titleClasses = "text-2xl font-bold mb-4 text-brand-100";
  
  return (
    <Layout>
      <div className="p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-brand-100">Gestión de Cursos</h1>
          
          {/* Formulario para crear curso */}
          <div className={cardClasses + " mb-6"}>
            <h2 className={titleClasses}>Nuevo Curso</h2>
            <CourseForm
              onSubmit={crearCurso}
              loading={loading}
            />
          </div>
          
          {/* Lista de cursos */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brand-100">Cursos Disponibles</h2>
            
            {loading ? (
              <p className="text-center py-4 text-brand-100">Cargando...</p>
            ) : cursos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cursos.map((curso) => (
                  <div key={curso.cod_curso} className={`${cardClasses} hover:border-brand-400`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-brand-100">{curso.titulo_curso}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-brand-600 text-brand-100">
                        Curso {curso.cod_curso}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-brand-100 text-sm">{curso.descripcion_curso || 'Sin descripción'}</p>
                    
                    <div className="mt-4 flex space-x-2">
                      <Link 
                        to={`/modules?curso=${curso.cod_curso}`}
                        className="text-brand-400 hover:text-brand-300 text-sm"
                      >
                        Ver Módulos
                      </Link>
                      <span className="text-brand-500">|</span>
                      <button 
                        className="text-brand-400 hover:text-brand-300 text-sm"
                        onClick={() => {
                          // Aquí iría la lógica para editar
                          console.log('Editar curso', curso.cod_curso);
                        }}
                      >
                        Editar
                      </button>
                      <span className="text-brand-500">|</span>
                      <button 
                        className="text-red-500 hover:text-red-400 text-sm"
                        onClick={() => {
                          // Aquí iría la lógica para eliminar
                          console.log('Eliminar curso', curso.cod_curso);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 bg-surface rounded-lg text-brand-100 border border-brand-600">
                No hay cursos disponibles. Crea un curso para comenzar.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};