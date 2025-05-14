import './index.css';
import { Layout } from './modules/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/test/message');
        setMessage(response.data.message);
        setError(null);
      } catch (err) {
        setError('Error al conectar con el backend');
        console.error('Error fetching message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Prueba de conexión</h1>
        {loading ? (
          <p className="text-xl">Cargando mensaje del backend...</p>
        ) : error ? (
          <p className="text-xl text-red-500">{error}</p>
        ) : (
          <div className="bg-accent/20 p-4 rounded-lg">
            <p className="text-xl">Mensaje del backend:</p>
            <p className="text-2xl font-bold mt-2">{message}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
