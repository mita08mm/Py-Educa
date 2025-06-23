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

import { seccionService, subseccionService } from '../../src/services/seccionService';
import type { Seccion, Subseccion } from '../../src/types/seccion';

describe('seccionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSeccion: Seccion = {
    cod_seccion: 1,
    cod_modulo: 10,
    titulo_seccion: "Sección A",
    descripcion_seccion: "Descripción de sección A",
  };

  const newSeccion: Seccion = {
    cod_modulo: 10,
    titulo_seccion: "Sección Nueva",
    descripcion_seccion: "Descripción nueva",
  };

  it('getAll debería retornar lista de secciones', async () => {
    mockedAxiosInstance.get.mockResolvedValueOnce({ data: [mockSeccion] });

    const result = await seccionService.getAll();

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/secciones');
    expect(result).toEqual([mockSeccion]);
  });

  it('create debería retornar la sección creada', async () => {
    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockSeccion });

    const result = await seccionService.create(newSeccion);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/secciones/', newSeccion);
    expect(result).toEqual(mockSeccion);
  });
});

describe('subseccionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSubseccion: Subseccion = {
    cod_subseccion: 5,
    cod_modulo: 10,
    cod_seccion: 1,
    titulo_subseccion: "Subsección A",
    descripcion_subseccion: "Subsección prueba",
  };

  const newSubseccion: Subseccion = {
    cod_modulo: 10,
    cod_seccion: 1,
    titulo_subseccion: "Nueva Subsección",
    descripcion_subseccion: "Descripción nueva",
  };

  it('getAll debería retornar lista de subsecciones', async () => {
    mockedAxiosInstance.get.mockResolvedValueOnce({ data: [mockSubseccion] });

    const result = await subseccionService.getAll();

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/subsecciones');
    expect(result).toEqual([mockSubseccion]);
  });

  it('create debería retornar la subsección creada', async () => {
    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockSubseccion });

    const result = await subseccionService.create(newSubseccion);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/subsecciones/', newSubseccion);
    expect(result).toEqual(mockSubseccion);
  });
});
