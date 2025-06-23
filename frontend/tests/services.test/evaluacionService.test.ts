jest.mock('../../src/config', () => ({
  API_BASE_URL: 'https://fake-api.com',
}));

const mockedAxiosInstance = {
  post: jest.fn(),
  get: jest.fn(),
};

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      create: () => mockedAxiosInstance,
    },
  };
});

import { evaluacionService } from '../../src/services/evaluacionService';
import type { Evaluacion } from '../../src/types/evaluacion';

describe('evaluacionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockEvaluacion: Evaluacion = {
  cod_evaluacion: 1,
  cod_modulo: 101,
  titulo_evaluacion: "Evaluación Final",
  descripcion_evaluacion: "Evaluación sobre lógica básica",
  input: "entrada de prueba",
  output: "salida esperada",
  input_ejemplo: "1 2",
  output_ejemplo: "3",
  codigo: "function main() { return true; }", // ← necesario
};

  it('getAll debería retornar una lista de evaluaciones', async () => {
    mockedAxiosInstance.get.mockResolvedValueOnce({ data: [mockEvaluacion] });

    const result = await evaluacionService.getAll();

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/evaluacion/');
    expect(result).toEqual([mockEvaluacion]);
  });

  it('create debería retornar la evaluación creada', async () => {
    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockEvaluacion });

    const result = await evaluacionService.create(mockEvaluacion);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/evaluacion/', mockEvaluacion);
    expect(result).toEqual(mockEvaluacion);
  });
});
