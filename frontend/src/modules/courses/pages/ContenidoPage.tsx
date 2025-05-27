import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../../layout';
import { ContenidoList } from '../components/ContenidoList';

export const ContenidoPage = () => {
  const [searchParams] = useSearchParams();
  const cod_subseccion = searchParams.get('subseccion') ? Number(searchParams.get('subseccion')) : null;
  const cod_seccion = searchParams.get('seccion') ? Number(searchParams.get('seccion')) : null;
  const cod_modulo = searchParams.get('modulo') ? Number(searchParams.get('modulo')) : null;
  const cod_curso = searchParams.get('curso') ? Number(searchParams.get('curso')) : null;

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
          <ContenidoList cod_subseccion={cod_subseccion} />
        </div>
      </div>
    </Layout>
  );
}; 