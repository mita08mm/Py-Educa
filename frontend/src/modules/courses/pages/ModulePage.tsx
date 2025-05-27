import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { moduloService, Modulo, cursoService, Curso } from '../../../services/api';
import { Layout } from '../../layout';
import { ModuleForm } from '../components/ModuleForm';

export const ModuleManagementPage = () => {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Cargar datos al iniciar
  useEffect(() => {
    if (cursoId) {
      cargarModulos();
      cargarCursoSeleccionado();
    }
    cargarCursos();
  }, [cursoId]);
  
  // Cargar módulos
  const cargarModulos = async () => {
    try {
      setLoading(true);
      const data = await moduloService.getAll();
      // Filtrar módulos por el curso seleccionado
      const modulosFiltrados = cursoId 
        ? data.filter(modulo => modulo.cod_curso === cursoId)
        : [];
      setModulos(modulosFiltrados);
    } catch (error) {
      console.error('Error al cargar módulos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar cursos
  const cargarCursos = async () => {
    try {
      const data = await cursoService.getAll();
      setCursos(data);
    } catch (error) {
      console.error('Error al cargar cursos:', error);
    }
  };

  // Cargar curso seleccionado
  const cargarCursoSeleccionado = async () => {
    if (!cursoId) return;
    try {
      const curso = await cursoService.getCourse(cursoId);
      setCursoSeleccionado(curso);
    } catch (error) {
      console.error('Error al cargar curso:', error);
    }
  };
  
  // Función para crear un nuevo módulo
  const crearModulo = async (data: Omit<Modulo, 'cod_modulo'>) => {
    if (!cursoId) {
      alert('Debes seleccionar un curso primero');
      return Promise.reject('No hay curso seleccionado');
    }
    try {
      setLoading(true);
      const nuevoModulo = await moduloService.create({
        ...data,
        cod_curso: cursoId
      });
      setModulos([...modulos, nuevoModulo]);
      setShowForm(false);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear módulo:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const cardClasses = "bg-surface p-6 rounded-lg shadow-lg border border-brand-600";
  const titleClasses = "text-2xl font-bold mb-4 text-brand-100";
  
  if (!cursoId) {
    return (
      <Layout>
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-brand-100">Selecciona un Curso</h1>
              <Link to="/courses/create" className="text-brand-400 hover:text-brand-300">
                Volver a Cursos
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cursos.map((curso: Curso) => (
                <Link 
                  key={curso.cod_curso} 
                  to={`/modules?curso=${curso.cod_curso}`}
                  className={`${cardClasses} hover:border-brand-400 transition-colors`}
                >
                  <h3 className="text-xl font-bold text-brand-100">{curso.titulo_curso}</h3>
                  <p className="mt-2 text-brand-100 text-sm">{curso.descripcion_curso || 'Sin descripción'}</p>
                </Link>
              ))}
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
              <h1 className="text-3xl font-bold text-brand-100">Gestión de Módulos</h1>
              {cursoSeleccionado && (
                <p className="text-brand-100 mt-2">Curso: {cursoSeleccionado.titulo_curso}</p>
              )}
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-[#46838C] text-white rounded-md hover:bg-[#3A6D75] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
              >
                {showForm ? 'Ver Módulos' : 'Agregar Módulo'}
              </button>
              <Link to="/courses/create" className="text-brand-400 hover:text-brand-300">
                Volver a Cursos
              </Link>
            </div>
          </div>
          
          {showForm ? (
            <div className={cardClasses + " mb-6"}>
              <h2 className={titleClasses}>Nuevo Módulo</h2>
              <ModuleForm
                onSubmit={crearModulo}
                loading={loading}
                cursos={[cursoSeleccionado!]}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-brand-100">Módulos Disponibles</h2>
              
              {loading ? (
                <p className="text-center py-4 text-brand-100">Cargando...</p>
              ) : modulos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modulos.map((modulo) => (
                    <div key={modulo.cod_modulo} className={`${cardClasses} hover:border-brand-400`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-100">{modulo.titulo_modulo}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-brand-600 text-brand-100">
                          Módulo {modulo.cod_modulo}
                        </span>
                      </div>
                      
                      <p className="mt-2 text-brand-100 text-sm">{modulo.descripcion_modulo || 'Sin descripción'}</p>
                      
                      <div className="mt-4 flex space-x-2">
                        <Link
                          to={`/sections?modulo=${modulo.cod_modulo}&curso=${cursoId}`}
                          className="text-brand-400 hover:text-brand-300 text-sm"
                        >
                          Gestionar Secciones
                        </Link>
                        <span className="text-brand-500">|</span>
                        <button 
                          className="text-brand-400 hover:text-brand-300 text-sm"
                          onClick={() => {
                            // Aquí iría la lógica para editar
                            console.log('Editar módulo', modulo.cod_modulo);
                          }}
                        >
                          Editar
                        </button>
                        <span className="text-brand-500">|</span>
                        <button 
                          className="text-red-500 hover:text-red-400 text-sm"
                          onClick={() => {
                            // Aquí iría la lógica para eliminar
                            console.log('Eliminar módulo', modulo.cod_modulo);
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
                  No hay módulos disponibles. Crea un módulo para comenzar.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}; 