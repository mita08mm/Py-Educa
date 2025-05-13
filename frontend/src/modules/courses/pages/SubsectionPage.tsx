import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { moduloService, Modulo, seccionService, Seccion, subseccionService, Subseccion } from '../../../services/api';
import { Layout } from '../../layout';
import { SubsectionForm } from '../components/SubsectionForm';

export const SubsectionManagementPage = () => {
  const [searchParams] = useSearchParams();
  const initialModuloId = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  const initialSeccionId = searchParams.get('seccion') ? Number(searchParams.get('seccion')) : null;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [subsecciones, setSubsecciones] = useState<Subseccion[]>([]);
  const [selectedModulo, setSelectedModulo] = useState<number | null>(initialModuloId);
  const [selectedSeccion, setSelectedSeccion] = useState<number | null>(initialSeccionId);
  
  // Cargar datos al iniciar
  useEffect(() => {
    cargarModulos();
    if (selectedModulo) {
      cargarSecciones();
    }
    if (selectedSeccion) {
      cargarSubsecciones();
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
  
  // Cargar subsecciones
  const cargarSubsecciones = async () => {
    try {
      setLoading(true);
      const data = await subseccionService.getAll();
      // Filtrar por la sección seleccionada
      const filteredSubsecciones = selectedSeccion 
        ? data.filter(subseccion => subseccion.cod_seccion === selectedSeccion)
        : data;
      setSubsecciones(filteredSubsecciones);
    } catch (error) {
      console.error('Error al cargar subsecciones:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para crear una nueva subsección
  const crearSubseccion = async (data: Omit<Subseccion, 'cod_subseccion'>) => {
    try {
      setLoading(true);
      const nuevaSubseccion = await subseccionService.create(data);
      setSubsecciones([...subsecciones, nuevaSubseccion]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al crear subsección:', error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Cambio de módulo seleccionado
  const handleModuloChange = (moduloId: number) => {
    setSelectedModulo(moduloId);
    setSelectedSeccion(null);
    cargarSecciones();
  };
  
  // Cambio de sección seleccionada
  const handleSeccionChange = (seccionId: number) => {
    setSelectedSeccion(seccionId);
    cargarSubsecciones();
  };

  const cardClasses = "bg-surface p-6 rounded-lg shadow-lg border border-brand-600";
  const titleClasses = "text-2xl font-bold mb-4 text-brand-100";
  const inputClasses = "w-full p-2 border border-brand-500 rounded-md bg-brand-600 text-brand-100 focus:border-brand-300 focus:outline-none";
  
  return (
    <Layout>
      <div className="p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brand-100">Gestión de Subsecciones</h1>
            <div className="space-x-4">
              <Link to="/sections/create" className="text-brand-400 hover:text-brand-300">
                Volver a Secciones
              </Link>
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
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-1 text-brand-100">Filtrar por Sección</label>
                <select
                  value={selectedSeccion || ''}
                  onChange={(e) => handleSeccionChange(Number(e.target.value))}
                  className={inputClasses}
                  disabled={!selectedModulo}
                >
                  <option value="">Todas las secciones</option>
                  {secciones
                    .filter(seccion => !selectedModulo || seccion.cod_modulo === selectedModulo)
                    .map((seccion) => (
                      <option key={seccion.cod_seccion} value={seccion.cod_seccion}>
                        {seccion.titulo_seccion}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <button
                  onClick={() => cargarSubsecciones()}
                  className="bg-brand-400 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Formulario para crear subsección */}
            <div className={cardClasses}>
              <h2 className={titleClasses}>Nueva Subsección</h2>
              <SubsectionForm
                onSubmit={crearSubseccion}
                loading={loading}
                secciones={secciones.filter(seccion => !selectedModulo || seccion.cod_modulo === selectedModulo)}
                initialData={selectedSeccion ? {
                  titulo_subseccion: '',
                  descripcion_subseccion: '',
                  cod_seccion: selectedSeccion,
                  cod_modulo: selectedModulo || 0
                } : undefined}
              />
            </div>
          </div>
          
          {/* Visualización de subsecciones */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brand-100">
              {selectedSeccion 
                ? `Subsecciones de la sección: ${secciones.find(s => s.cod_seccion === selectedSeccion)?.titulo_seccion || 'Seleccionada'}`
                : 'Todas las Subsecciones'
              }
            </h2>
            
            {loading ? (
              <p className="text-center py-4 text-brand-100">Cargando...</p>
            ) : subsecciones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subsecciones.map((subseccion) => (
                  <div key={subseccion.cod_subseccion} className={`${cardClasses} hover:border-brand-400`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-brand-100">{subseccion.titulo_subseccion}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-brand-600 text-brand-100">
                        Subsección {subseccion.cod_subseccion}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-brand-100 text-sm">{subseccion.descripcion_subseccion || 'Sin descripción'}</p>
                    
                    <div className="mt-4 flex space-x-2">
                      <button 
                        className="text-brand-400 hover:text-brand-300 text-sm"
                        onClick={() => {
                          // Aquí iría la lógica para editar
                          console.log('Editar subsección', subseccion.cod_subseccion);
                        }}
                      >
                        Editar
                      </button>
                      <span className="text-brand-500">|</span>
                      <button 
                        className="text-red-500 hover:text-red-400 text-sm"
                        onClick={() => {
                          // Aquí iría la lógica para eliminar
                          console.log('Eliminar subsección', subseccion.cod_subseccion);
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
                {selectedSeccion 
                  ? 'No hay subsecciones disponibles para esta sección. Crea una subsección para comenzar.'
                  : 'No hay subsecciones disponibles. Selecciona una sección o crea una subsección para comenzar.'
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}; 