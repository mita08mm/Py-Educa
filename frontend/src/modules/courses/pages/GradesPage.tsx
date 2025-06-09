import { useState, useEffect } from 'react';
import { notaService } from '../../../services/api';
import { Nota } from '../../../services/api';

const GradesPage = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedNota, setSelectedNota] = useState<Nota | null>(null);
  
  useEffect(() => {
    loadNotas();
  }, []);

  const loadNotas = async () => {
    setLoading(true);
    try {
      const notasData = await notaService.getNota(5, 1); 
      setNotas([notasData]); 
    } catch (error) {
      console.error('Error al cargar notas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalificar = async (nota: Nota) => {
    try {
      await notaService.calificar(nota);
      loadNotas();
    } catch (error) {
      console.error('Error al calificar:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Calificaciones</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Problema</th>
              <th className="px-4 py-2 border">Calificación</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <tr key={nota.cod_problema}>
                <td className="px-4 py-2 border">{nota.cod_usuario}</td>
                <td className="px-4 py-2 border">{nota.cod_problema}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    value={nota.nota}
                    onChange={(e) => {
                      setSelectedNota({
                        ...nota,
                        nota: parseFloat(e.target.value),
                      });
                    }}
                    className="w-16 p-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleCalificar(selectedNota!)}
                    className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-400 focus:outline-none"
                  >
                    Calificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradesPage;
