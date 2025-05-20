import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Curso {
  cod_curso?: number;
  titulo_curso: string;
  descripcion_curso?: string;
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

  createCourse: async (data: Curso): Promise<Curso> => {
    const response = await api.post('/cursos/', data);
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

export default api; 