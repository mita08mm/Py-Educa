import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface CodeExecutionResult {
  status: {
    id: number;
    description: string;
  };
  stdout: string;
  stderr: string;
  memory: string;
  time: string;
}

export const executeCode = async (code: string): Promise<CodeExecutionResult> => {
  try {
    console.log('Enviando código al backend:', code);
    const response = await axios.post(`${API_URL}/api/code/execute`, { code });
    console.log('Respuesta del backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al ejecutar el código:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message || 'Error al ejecutar el código';
      throw new Error(errorMessage);
    }
    throw error;
  }
}; 