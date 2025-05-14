import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { cursoService, Curso, moduloService, Modulo } from '../../../services/api';
import { Layout } from '../../layout';
import { ModuleForm } from '../components/ModuleForm';

export const ModuleManagementPage = () => {
  const [searchParams] = useSearchParams();
  const initialCursoId = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<number | null>(initialCursoId);
  
  // Cargar datos al iniciar
  useEffect(() => {
    cargarCursos();
    if (selectedCurso) {
      cargarModulos();
    }
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
  
  // Cargar módulos
  const cargarModulos = async () => {
    try {
      setLoading(true);
      const data = await moduloService.getAll();
      // Filtrar por el curso seleccionado
      const filteredModulos = selectedCurso 
        ? data.filter(modulo => modulo.cod_curso === selectedCurso)
        : data;
      setModulos(filteredModulos);
    } catch (error) {
      console.error('Error al cargar módulos:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para crear un nuevo módulo
  const crearModulo = async (data: Omit<Modulo, 'cod_modulo'>) => {
    try {
      setLoading(true);
      const nuevoModulo = await moduloService.create(data);
      setModulos([...modulos, nuevoModulo]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear módulo:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Cambio de curso seleccionado
  const handleCursoChange = (cursoId: number) => {
    setSelectedCurso(cursoId);
    cargarModulos();
  };

  const cardClasses = "bg-surface p-6 rounded-lg shadow-lg border border-brand-600";
  const titleClasses = "text-2xl font-bold mb-4 text-brand-100";
  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  
  return (
    <Layout>
      <div className="p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brand-100">Gestión de Módulos</h1>
            <Link to="/courses/create" className="text-brand-400 hover:text-brand-300">
              Volver a Cursos
            </Link>
          </div>
          
          {/* Filtrado y acciones */}
          <div className={cardClasses + " mb-6"}>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-1 text-brand-100">Filtrar por Curso</label>
                <select
                  value={selectedCurso || ''}
                  onChange={(e) => handleCursoChange(Number(e.target.value))}
                  className={inputClasses}
                >
                  <option value="">Todos los cursos</option>
                  {cursos.map((curso) => (
                    <option key={curso.cod_curso} value={curso.cod_curso}>
                      {curso.titulo_curso}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <Link 
                  to="/sections/create" 
                  className="bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Gestionar Secciones
                </Link>
                <button
                  onClick={() => cargarModulos()}
                  className="bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>

            {/* Formulario para crear módulo */}
            <div className={cardClasses}>
              <h2 className={titleClasses}>Nuevo Módulo</h2>
              <ModuleForm
                onSubmit={crearModulo}
                loading={loading}
                cursos={cursos}
                initialData={selectedCurso ? { cod_curso: selectedCurso, titulo_modulo: '', descripcion_modulo: '' } : undefined}
              />
            </div>
  
          {/* Visualización de módulos */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brand-100">
              {selectedCurso 
                ? `Módulos del curso: ${cursos.find(c => c.cod_curso === selectedCurso)?.titulo_curso || 'Seleccionado'}`
                : 'Todos los Módulos'
              }
            </h2>
            
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
                        to={`/sections/create?modulo=${modulo.cod_modulo}`} 
                        className="text-brand-400 hover:text-brand-300 text-sm"
                      >
                        Ver Secciones
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
                {selectedCurso 
                  ? 'No hay módulos disponibles para este curso. Crea un módulo para comenzar.'
                  : 'No hay módulos disponibles. Selecciona un curso o crea un módulo para comenzar.'
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}; 