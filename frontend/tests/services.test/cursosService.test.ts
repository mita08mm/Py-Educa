
jest.mock('../../src/config', () => ({
  API_BASE_URL: 'https://fake-api.com',
}));

const mockedAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockedAxiosInstance),
    },
  };
});

import { cursoService } from '../../src/services/cursoService';

describe('cursoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getCursos debería retornar una lista de cursos', async () => {
    const mockCursos = [
      {
        cod_curso: 1,
        nombre: 'Curso de React',
        descripcion: 'Aprende React desde cero',
        imagen: 'data:image/png;base64,...',
      },
    ];

    mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockCursos });

    const result = await cursoService.getCursos();

    expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/cursos');
    expect(result).toEqual(mockCursos);
  });

  it('createCurso debería retornar el curso creado', async () => {
    const formData = new FormData();
    formData.append('nombre', 'Curso de Vue');
    formData.append('descripcion', 'Aprende Vue.js');
    formData.append('imagen', new Blob(['img']) as any, 'imagen.png');

    const mockCurso = {
      cod_curso: 2,
      nombre: 'Curso de Vue',
      descripcion: 'Aprende Vue.js',
      imagen: 'data:image/png;base64,...',
    };

    mockedAxiosInstance.post.mockResolvedValueOnce({ data: mockCurso });

    const result = await cursoService.createCurso(formData);

    expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/cursos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    expect(result).toEqual(mockCurso);
  });
});
