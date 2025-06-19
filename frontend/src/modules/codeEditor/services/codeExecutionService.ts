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
  input_used?: number;
}

export const executeCode = async (code: string, input?: string[]): Promise<CodeExecutionResult> => {
  try {
    console.log('Enviando código al backend:', code);
    console.log('Input proporcionado:', input);
    
    const payload: any = { code };
    if (input && input.length > 0) {
      payload.input = input;
    }
    
    const response = await axios.post(`${API_URL}/api/code/execute`, payload);
    console.log('Respuesta del backend:', response);
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