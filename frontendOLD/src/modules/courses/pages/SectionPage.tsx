import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { seccionService, Seccion, moduloService, Modulo, cursoService, Curso } from '../../../services/api';
import { Layout } from '../../layout';
import { SectionForm } from '../components/SectionForm';

export const SectionManagementPage = () => {
  const [searchParams] = useSearchParams();
  const moduloId = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  const cursoId = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [moduloSeleccionado, setModuloSeleccionado] = useState<Modulo | null>(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Cargar datos al iniciar
  useEffect(() => {
    if (cursoId) {
      cargarModulos();
      cargarCursoSeleccionado();
      cargarCursos();
    }
    if (moduloId) {
      cargarSecciones();
      cargarModuloSeleccionado();
    }
  }, [cursoId, moduloId]);
  
  // Cargar secciones
  const cargarSecciones = async () => {
    try {
      setLoading(true);
      const data = await seccionService.getAll();
      // Filtrar secciones por el módulo seleccionado
      const seccionesFiltradas = moduloId 
        ? data.filter(seccion => seccion.cod_modulo === moduloId)
        : [];
      setSecciones(seccionesFiltradas);
    } catch (error) {
      console.error('Error al cargar secciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar módulos
  const cargarModulos = async () => {
    try {
      const data = await moduloService.getAll();
      // Filtrar módulos por el curso seleccionado
      const modulosFiltrados = cursoId 
        ? data.filter(modulo => modulo.cod_curso === cursoId)
        : [];
      setModulos(modulosFiltrados);
    } catch (error) {
      console.error('Error al cargar módulos:', error);
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

  // Cargar módulo seleccionado
  const cargarModuloSeleccionado = async () => {
    if (!moduloId) return;
    try {
      const modulos = await moduloService.getAll();
      const modulo = modulos.find(m => m.cod_modulo === moduloId);
      if (modulo) {
        setModuloSeleccionado(modulo);
      }
    } catch (error) {
      console.error('Error al cargar módulo:', error);
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
  
  // Función para crear una nueva sección
  const crearSeccion = async (data: Omit<Seccion, 'cod_seccion'>) => {
    if (!moduloId) {
      alert('Debes seleccionar un módulo primero');
      return Promise.reject('No hay módulo seleccionado');
    }
    try {
      setLoading(true);
      const nuevaSeccion = await seccionService.create({
        ...data,
        cod_modulo: moduloId
      });
      setSecciones([...secciones, nuevaSeccion]);
      setShowForm(false);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear sección:', error);
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

  if (!moduloId) {
    return (
      <Layout>
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-brand-100">Selecciona un Módulo</h1>
                {cursoSeleccionado && (
                  <p className="text-brand-100 mt-2">Curso: {cursoSeleccionado.titulo_curso}</p>
                )}
              </div>
              <Link to={`/modules?curso=${cursoId}`} className="text-brand-400 hover:text-brand-300">
                Volver a Módulos
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulos.map((modulo) => (
                <Link 
                  key={modulo.cod_modulo} 
                  to={`/sections?modulo=${modulo.cod_modulo}&curso=${cursoId}`}
                  className={`${cardClasses} hover:border-brand-400 transition-colors`}
                >
                  <h3 className="text-xl font-bold text-brand-100">{modulo.titulo_modulo}</h3>
                  <p className="mt-2 text-brand-100 text-sm">{modulo.descripcion_modulo || 'Sin descripción'}</p>
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
              <h1 className="text-3xl font-bold text-brand-100">Gestión de Secciones</h1>
              {cursoSeleccionado && (
                <p className="text-brand-100 mt-2">Curso: {cursoSeleccionado.titulo_curso}</p>
              )}
              {moduloSeleccionado && (
                <p className="text-brand-100 mt-1">Módulo: {moduloSeleccionado.titulo_modulo}</p>
              )}
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-[#46838C] text-white rounded-md hover:bg-[#3A6D75] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
              >
                {showForm ? 'Ver Secciones' : 'Agregar Sección'}
              </button>
              <Link to={`/modules?curso=${cursoId}`} className="text-brand-400 hover:text-brand-300">
                Volver a Módulos
              </Link>
              <Link to="/courses/create" className="text-brand-400 hover:text-brand-300">
                Volver a Cursos
              </Link>
            </div>
          </div>
          
          {showForm ? (
            <div className={cardClasses + " mb-6"}>
              <h2 className={titleClasses}>Nueva Sección</h2>
              <SectionForm
                onSubmit={crearSeccion}
                loading={loading}
                modulos={[moduloSeleccionado!]}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-brand-100">Secciones Disponibles</h2>
              
              {loading ? (
                <p className="text-center py-4 text-brand-100">Cargando...</p>
              ) : secciones.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {secciones.map((seccion) => (
                    <div key={seccion.cod_seccion} className={`${cardClasses} hover:border-brand-400`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-brand-100">{seccion.titulo_seccion}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-brand-600 text-brand-100">
                          Sección {seccion.cod_seccion}
                        </span>
                      </div>
                      
                      <p className="mt-2 text-brand-100 text-sm">{seccion.descripcion_seccion || 'Sin descripción'}</p>
                      
                      <div className="mt-4 flex space-x-2">
                        <Link
                          to={`/subsections?seccion=${seccion.cod_seccion}&modulo=${moduloId}&curso=${cursoId}`}
                          className="text-brand-400 hover:text-brand-300 text-sm"
                        >
                          Gestionar Subsecciones
                        </Link>
                        <span className="text-brand-500">|</span>
                        <button 
                          className="text-brand-400 hover:text-brand-300 text-sm"
                          onClick={() => {
                            // Aquí iría la lógica para editar
                            console.log('Editar sección', seccion.cod_seccion);
                          }}
                        >
                          Editar
                        </button>
                        <span className="text-brand-500">|</span>
                        <button 
                          className="text-red-500 hover:text-red-400 text-sm"
                          onClick={() => {
                            // Aquí iría la lógica para eliminar
                            console.log('Eliminar sección', seccion.cod_seccion);
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
                  No hay secciones disponibles. Crea una sección para comenzar.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}; 