import axios from 'axios';
import { contenidoService } from '../../src/services/contenidoService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('contenidoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar contenido simulado', async () => {
    const dataMock = [{ cod_modulo: 1, descripcion: 'test' }];

    // Simula la respuesta completa que axios espera
    mockedAxios.get.mockResolvedValue({
      data: dataMock,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    const result = await contenidoService.getBySubseccion(1);

    expect(mockedAxios.get).toHaveBeenCalledWith('/contenido/1');
    expect(result).toEqual(dataMock);
  });
});
