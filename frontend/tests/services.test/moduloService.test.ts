jest.mock('../../src/config', () => ({
  API_BASE_URL: 'https://fake-api.com',
}));

const mockedAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: () => mockedAxiosInstance,
  },
}));

import { moduloService } from '../../src/services/moduloService';
import type { Modulo, CreateModuloData } from '../../src/types/modulo';

describe('moduloService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockModulo: Modulo = {
    cod_curso: 1,
    cod_modulo: 10,
    titulo_modulo: "Módulo de prueba",
    descripcion_modulo: "Este es un módulo de prueba",
  };

  const newModuloData: CreateModuloData = {
    cod_curso: 1,
    titulo_modulo: "Nuevo Módulo",
    descripcion_modulo: "Este es un nuevo módulo",
  };

  it('getModulos debería retornar una lista de módulos', async () => {
    mockedAxiosInstance.get.mockResolvedValueOnce({ data: [mockModulo] });

    const result = await moduloService.getModulos();

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/modulos');
    expect(result).toEqual([mockModulo]);
  });

  it('createModulo debería retornar el módulo creado', async () => {
    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockModulo });

    const result = await moduloService.createModulo(newModuloData);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/modulos/', newModuloData);
    expect(result).toEqual(mockModulo);
  });
});
