import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../../layout';
import { ContenidoForm } from '../components/ContenidoForm';
import { ContenidoList } from '../components/ContenidoList';
import { Link } from 'react-router-dom';

export const ContenidoPage = () => {
  const [searchParams] = useSearchParams();
  const cod_subseccion = searchParams.get('subseccion') ? Number(searchParams.get('subseccion')) : null;
  const cod_seccion = searchParams.get('seccion') ? Number(searchParams.get('seccion')) : null;
  const cod_modulo = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  const cod_curso = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;

  const [showForm, setShowForm] = useState(false);

  if (!cod_subseccion || !cod_seccion || !cod_modulo || !cod_curso) {
    return (
      <Layout>
        <div className="p-4">
          <div className="container mx-auto">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold text-[#E2E8F0] mb-4">
                Información incompleta
              </h1>
              <p className="text-[#94A3B8]">
                Necesitas seleccionar un curso, módulo, sección y subsección para ver el contenido.
              </p>
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
            <h1 className="text-2xl font-bold text-[#E2E8F0]">
              Contenido de la Subsección
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-[#46838C] text-white rounded-md hover:bg-[#3A6D75] focus:outline-none focus:ring-2 focus:ring-[#46838C]"
              >
                {showForm ? 'Ver Contenido' : 'Agregar Contenido'}
              </button>
              <Link 
                to={`/subsections?seccion=${cod_seccion}&modulo=${cod_modulo}&curso=${cod_curso}`} 
                className="text-brand-400 hover:text-brand-300"
              >
                Volver a Subsecciones
              </Link>
              <Link 
                to={`/sections?modulo=${cod_modulo}&curso=${cod_curso}`} 
                className="text-brand-400 hover:text-brand-300"
              >
                Volver a Secciones
              </Link>
              <Link 
                to={`/modules?curso=${cod_curso}`} 
                className="text-brand-400 hover:text-brand-300"
              >
                Volver a Módulos
              </Link>
              <Link 
                to="/courses/create" 
                className="text-brand-400 hover:text-brand-300"
              >
                Volver a Cursos
              </Link>
            </div>
          </div>

          {showForm ? (
            <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">
                Agregar Nuevo Contenido
              </h2>
              <ContenidoForm
                cod_modulo={cod_modulo}
                cod_seccion={cod_seccion}
                cod_subseccion={cod_subseccion}
                onSuccess={() => setShowForm(false)}
              />
            </div>
          ) : (
            <ContenidoList cod_subseccion={cod_subseccion} />
          )}
        </div>
      </div>
    </Layout>
  );
}; 