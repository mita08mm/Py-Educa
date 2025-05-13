import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { moduloService, Modulo, seccionService, Seccion } from '../../../services/api';
import { Layout } from '../../layout';
import { SectionForm } from '../components/SectionForm';

export const SectionManagementPage = () => {
  const [searchParams] = useSearchParams();
  const initialModuloId = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [selectedModulo, setSelectedModulo] = useState<number | null>(initialModuloId);
  
  // Cargar datos al iniciar
  useEffect(() => {
    cargarModulos();
    if (selectedModulo) {
      cargarSecciones();
    }
  }, []);
  
  // Cargar módulos
  const cargarModulos = async () => {
    try {
      setLoading(true);
      const data = await moduloService.getAll();
      setModulos(data);
    } catch (error) {
      console.error('Error al cargar módulos:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Cargar secciones
  const cargarSecciones = async () => {
    try {
      setLoading(true);
      const data = await seccionService.getAll();
      // Filtrar por el módulo seleccionado
      const filteredSecciones = selectedModulo 
        ? data.filter(seccion => seccion.cod_modulo === selectedModulo)
        : data;
      setSecciones(filteredSecciones);
    } catch (error) {
      console.error('Error al cargar secciones:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para crear una nueva sección
  const crearSeccion = async (data: Omit<Seccion, 'cod_seccion'>) => {
    try {
      setLoading(true);
      const nuevaSeccion = await seccionService.create(data);
      setSecciones([...secciones, nuevaSeccion]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear sección:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Cambio de módulo seleccionado
  const handleModuloChange = (moduloId: number) => {
    setSelectedModulo(moduloId);
    cargarSecciones();
  };

  const cardClasses = "bg-surface p-6 rounded-lg shadow-lg border border-brand-600";
  const titleClasses = "text-2xl font-bold mb-4 text-brand-100";
  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  
  return (
    <Layout>
      <div className="p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brand-100">Gestión de Secciones</h1>
            <div className="space-x-4">
              <Link to="/modules/create" className="text-brand-400 hover:text-brand-300">
                Volver a Módulos
              </Link>
              <Link to="/courses/create" className="text-brand-400 hover:text-brand-300">
                Volver a Cursos
              </Link>
            </div>
          </div>
          
          {/* Filtrado y acciones */}
          <div className={cardClasses + " mb-6"}>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-1 text-brand-100">Filtrar por Módulo</label>
                <select
                  value={selectedModulo || ''}
                  onChange={(e) => handleModuloChange(Number(e.target.value))}
                  className={inputClasses}
                >
                  <option value="">Todos los módulos</option>
                  {modulos.map((modulo) => (
                    <option key={modulo.cod_modulo} value={modulo.cod_modulo}>
                      {modulo.titulo_modulo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <Link 
                  to="/subsections/create" 
                  className="bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Gestionar Subsecciones
                </Link>
                <button
                  onClick={() => cargarSecciones()}
                  className="bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Formulario para crear sección */}
            <div className={cardClasses}>
              <h2 className={titleClasses}>Nueva Sección</h2>
              <SectionForm
                onSubmit={crearSeccion}
                loading={loading}
                modulos={modulos}
                initialData={selectedModulo ? { titulo_seccion: '', descripcion_seccion: '', cod_modulo: selectedModulo } : undefined}
              />
            </div>
          </div>
          
          {/* Visualización de secciones */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brand-100">
              {selectedModulo 
                ? `Secciones del módulo: ${modulos.find(m => m.cod_modulo === selectedModulo)?.titulo_modulo || 'Seleccionado'}`
                : 'Todas las Secciones'
              }
            </h2>
            
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
                        to={`/subsections/create?seccion=${seccion.cod_seccion}&modulo=${seccion.cod_modulo}`} 
                        className="text-brand-400 hover:text-brand-300 text-sm"
                      >
                        Ver Subsecciones
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
                {selectedModulo 
                  ? 'No hay secciones disponibles para este módulo. Crea una sección para comenzar.'
                  : 'No hay secciones disponibles. Selecciona un módulo o crea una sección para comenzar.'
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}; 