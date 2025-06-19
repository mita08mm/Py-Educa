import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Curso {
  cod_curso?: number;
  titulo_curso: string;
  descripcion_curso?: string;
  imagen_curso?: string;
}

export interface Modulo {
  cod_modulo?: number;
  cod_curso: number;
  titulo_modulo: string;
  descripcion_modulo?: string;
}

export interface Seccion {
  cod_seccion?: number;
  titulo_seccion: string;
  descripcion_seccion?: string;
  cod_modulo: number;
}

export interface Subseccion {
  cod_subseccion?: number;
  titulo_subseccion: string;
  descripcion_subseccion?: string;
  cod_modulo: number;
  cod_seccion: number;
}

export interface Contenido {
  cod_modulo: number;
  cod_seccion: number;
  cod_subseccion: number;
  cod_contenido: number;
  descripcion?: string;
  link?: string;
  imagen?: string;
}

export interface Evaluacion {
  cod_evaluacion?: number; // Cambiado a opcional para creación
  cod_modulo: number;
  titulo_evaluacion: string;
  descripcion_evaluacion: string;
  input: string;
  output: string;
  input_ejemplo: string;
  output_ejemplo: string;
  codigo: string;
}

export interface Nota {
  cod_problema: number;
  cod_usuario: number;
  nota: number;
  nota_total: number;
}


// Servicios para Cursos
export const cursoService = {
  getAll: async (): Promise<Curso[]> => {
    const response = await api.get('/cursos/');
    return response.data;
  },
  
  getCourse: async (id: number): Promise<Curso> => {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
  },

  createCourse: async (data: FormData): Promise<Curso> => {
    const response = await api.post('/cursos/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },  
    });
    return response.data;
  },

  updateCourse: async (id: number, data: Curso): Promise<Curso> => {
    const response = await api.put(`/cursos/${id}`, data);
    return response.data;
  },
};

// Servicios para Módulos
export const moduloService = {
  getAll: async (): Promise<Modulo[]> => {
    const response = await api.get('/modulos/');
    return response.data;
  },
  
  getOne: async (id: number): Promise<Modulo> => {
    const response = await api.get(`/modulos/${id}`);
    return response.data;
  },
  
  create: async (data: Modulo): Promise<Modulo> => {
    const response = await api.post('/modulos/', data);
    return response.data;
  },
};

// Servicios para Secciones
export const seccionService = {
  getAll: async (): Promise<Seccion[]> => {
    const response = await api.get('/secciones/');
    return response.data;
  },
  
  create: async (data: Seccion): Promise<Seccion> => {
    const response = await api.post('/secciones/', data);
    return response.data;
  },
};

// Servicios para Subsecciones
export const subseccionService = {
  getAll: async (): Promise<Subseccion[]> => {
    const response = await api.get('/subsecciones/');
    return response.data;
  },
  
  create: async (data: Subseccion): Promise<Subseccion> => {
    const response = await api.post('/subsecciones/', data);
    return response.data;
  },
};

// Servicios para Contenido
export const contenidoService = {
  getBySubseccion: async (cod_subseccion: number): Promise<Contenido[]> => {
    const response = await api.get(`/contenido/${cod_subseccion}`);
    return response.data;
  },
  create: async (cod_subseccion: number, data: FormData): Promise<Contenido> => {
    const response = await api.post(`/contenido/${cod_subseccion}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

// Servicios para Evaluaciones
export const evaluacionService = {
  create: async (data: any): Promise<Evaluacion> => {
    const response = await api.post('/evaluaciones/', data);
    return response.data;
  },
  getAll: async (): Promise<Evaluacion[]> => {
    const response = await api.get('/evaluaciones/');
    return response.data;
  },
};

export const notaService = {
  getNota: async (
    cod_problema:number, cod_usuario: number
  ): Promise<Nota> => {
    const response = await api.get('/nota',{ params: {cod_problema,cod_usuario}});
    return response.data
  },
  calificar: async (notaData: Nota): Promise<any> => {
    const response = await api.post('/nota/califica', notaData);
    return response.data
  }
}
export default api;