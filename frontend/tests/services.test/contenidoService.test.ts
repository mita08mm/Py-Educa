
jest.mock('../../src/config', () => ({
  API_BASE_URL: 'https://fake-api.com',
}));

// 👇 Mock de axios con setup manual de instancia
const mockedAxiosInstance = {
  get: jest.fn(),
  post: jest.fn()
};

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockedAxiosInstance)
    }
  };
});

import { contenidoService } from '../../src/services/contenidoService';

describe('contenidoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBySubseccion debería retornar una lista de contenidos', async () => {
    const mockData = [
      {
        cod_modulo: 1,
        cod_seccion: 2,
        cod_subseccion: 3,
        descripcion: 'Contenido de prueba',
        link: 'https://link.com',
        imagen: 'data:image/png;base64,...'
      }
    ];

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await contenidoService.getBySubseccion(3);

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/contenido/3');
    expect(result).toEqual(mockData);
  });

  it('create debería retornar el contenido creado', async () => {
    const formData = new FormData();
    formData.append('descripcion', 'Nuevo contenido');
    formData.append('link', 'https://nuevo.com');
    formData.append('cod_modulo', '1');
    formData.append('cod_seccion', '2');
    formData.append('imagen', new Blob(['imagen']) as any, 'foto.png');

    const mockResponse = {
      cod_modulo: 1,
      cod_seccion: 2,
      cod_subseccion: 4,
      descripcion: 'Nuevo contenido',
      link: 'https://nuevo.com',
      imagen: 'data:image/png;base64,...'
    };

    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await contenidoService.create(4, formData);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith(
      '/contenido/4',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    expect(result).toEqual(mockResponse);
  });
});
