import { useState, useEffect } from 'react';
import { Layout } from '../../layout';

const GradesPage = () => {
  // Datos estáticos que simulan la respuesta de la consulta SQL
  const estudiantes = [
    {
      cod_usuario: '1',
      nombre: 'dafdfa Pérez',
      problemas: [
        {
          cod_problema: 1,
          titulo_problema: 'Suma de enteros',
          descripcion_problema: 'Sumar dos números enteros',
          input: '2 3',
          output: '5',
          calificacion: 95,
        },
        {
          cod_problema: 2,
          titulo_problema: 'Consulta básica',
          descripcion_problema: 'Seleccionar todos los registros de una tabla',
          input: 'SELECT * FROM alumnos;',
          output: 'resultado',
          calificacion: 80,
        },
        {
          cod_problema: 3,
          titulo_problema: 'asdfadfasdf básica',
          descripcion_problema: 'Seleccionar todos los registros de una tabla',
          input: 'SELECT * FROM alumnos;',
          output: 'resultado',
          calificacion: 80,
        },
        {
          cod_problema: 4,
          titulo_problema: 'Consulta avanzada',
          descripcion_problema: 'Hacer una consulta compleja',
          input: 'SELECT * FROM empleados;',
          output: 'resultado',
          calificacion: 75,
        },
        {
            cod_problema: 5,
            titulo_problema: 'Consulta avanzada',
            descripcion_problema: 'Hacer una consulta compleja',
            input: 'SELECT * FROM empleados;',
            output: 'resultado',
            calificacion: 75,
        },
        {
            cod_problema:6,
            titulo_problema: 'Consulta avanzada',
            descripcion_problema: 'Hacer una consulta compleja',
            input: 'SELECT * FROM empleados;',
            output: 'resultado',
            calificacion: 75,
        },
      ],
    },
    {
      cod_usuario: 'anag',
      nombre: 'Ana Gómez',
      problemas: [
        {
          cod_problema: 1,
          titulo_problema: 'Suma de enteros',
          descripcion_problema: 'Sumar dos números enteros',
          input: '5 7',
          output: '12',
          calificacion: 90,
        },
        {
          cod_problema: 2,
          titulo_problema: 'Consulta básica',
          descripcion_problema: 'Seleccionar todos los registros de una tabla',
          input: 'SELECT * FROM alumnos;',
          output: 'resultado',
          calificacion: 70,
        },
        {
          cod_problema: 3,
          titulo_problema: 'asdfadfasdf básica',
          descripcion_problema: 'Seleccionar todos los registros de una tabla',
          input: 'SELECT * FROM alumnos;',
          output: 'resultado',
          calificacion: 80,
        },
        {
          cod_problema: 4,
          titulo_problema: 'Consulta avanzada',
          descripcion_problema: 'Hacer una consulta compleja',
          input: 'SELECT * FROM empleados;',
          output: 'resultado',
          calificacion: 75,
        },
        {
            cod_problema: 5,
            titulo_problema: 'Consulta avanzada',
            descripcion_problema: 'Hacer una consulta compleja',
            input: 'SELECT * FROM empleados;',
            output: 'resultado',
            calificacion: 75,
        },
      ],
    },
  ];

  // Utilizamos estos datos en el estado
  const [loading, setLoading] = useState<boolean>(false);
  const [estudiantesData, setEstudiantesData] = useState(estudiantes);

  useEffect(() => {
    // Simulamos una carga de datos
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Función para manejar la actualización de las calificaciones
  const handleCalificacionChange = (
    cod_usuario: string,
    cod_problema: number,
    nuevaCalificacion: number
  ) => {
    setEstudiantesData((prevData) =>
      prevData.map((estudiante) => {
        if (estudiante.cod_usuario === cod_usuario) {
          return {
            ...estudiante,
            problemas: estudiante.problemas.map((problema) =>
              problema.cod_problema === cod_problema
                ? { ...problema, calificacion: nuevaCalificacion }
                : problema
            ),
          };
        }
        return estudiante;
      })
    );
  };

  // Extraemos todos los problemas únicos de los estudiantes
  const todosLosProblemas = [
    ...new Set(estudiantesData.flatMap((estudiante) => estudiante.problemas.map((problema) => problema.cod_problema)))
  ];

  return (
    <Layout>
    <div className="bg-brand-600 border border-brand-600 p-6 w-full h-screen">
    
      <div className="bg-brand-600 border-4 border-brand-400 rounded-lg shadow-lg overflow-hidden">
      <h1 className="text-xl font-bold mb-4 text-center text-white">Calificaciones</h1>
      
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-brand-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Estudiante</th>
                {/* Generamos dinámicamente las columnas para todos los problemas únicos */}
                {todosLosProblemas.map((cod_problema) => {
                  const problema = estudiantesData[0].problemas.find((p) => p.cod_problema === cod_problema);
                  return problema ? (
                    <th key={cod_problema} className="px-6 py-3 text-left">
                      {problema.titulo_problema}
                    </th>
                  ) : null;
                })}
              </tr>
            </thead>
            <tbody>
              {estudiantesData.map((estudiante) => (
                <tr key={estudiante.cod_usuario} className="border-b hover:bg-slate-800 text-white">
                  {/* Columna 1: Estudiantes */}
                  <td className="px-6 py-4">{estudiante.nombre}</td>
                  
                  {/* Generamos dinámicamente las columnas de las calificaciones para cada estudiante */}
                  {todosLosProblemas.map((cod_problema) => {
                    const problema = estudiante.problemas.find((p) => p.cod_problema === cod_problema);
                    return (
                      <td key={cod_problema} className="px-6 py-4 text-white">
                        {problema ? (
                        <div className="flex items-center">
                            <input
                            type="number"
                            value={problema.calificacion}
                            onChange={(e) =>
                                handleCalificacionChange(
                                estudiante.cod_usuario,
                                problema.cod_problema,
                                parseFloat(e.target.value)
                                )
                            }
                            className="w-16 px-2 py-1 border-b-2 border-blue-500 focus:outline-none text-center bg-blue-400"
                            min="0"
                            max="100"
                            />
                            <span className="ml-1 text-white">/ 100</span>
                        </div>
                        ) : (
                        <span className="text-white">N/A</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
    </Layout>
  );
};

export default GradesPage;
