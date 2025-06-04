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

// Servicios para Evaluaciones - Unificado con axios
export const evaluacionService = {
  // Obtener todas las evaluaciones
  getAll: async (): Promise<Evaluacion[]> => {
    const response = await api.get('/evaluaciones/');
    return response.data;
  },

  // Obtener evaluaciones por módulo
  getByModulo: async (codModulo: number): Promise<Evaluacion[]> => {
    const response = await api.get(`/evaluaciones/?modulo=${codModulo}`);
    return response.data;
  },

  // Obtener una evaluación específica
  getOne: async (codEvaluacion: number): Promise<Evaluacion> => {
    const response = await api.get(`/evaluaciones/${codEvaluacion}`);
    return response.data;
  },

  // Crear una nueva evaluación
  create: async (evaluacion: Omit<Evaluacion, 'cod_evaluacion'>): Promise<Evaluacion> => {
    const response = await api.post('/evaluaciones/', evaluacion);
    return response.data;
  },

  // Actualizar una evaluación existente
  update: async (evaluacion: Evaluacion): Promise<Evaluacion> => {
    if (!evaluacion.cod_evaluacion) {
      throw new Error('Se requiere el código de evaluación para actualizar');
    }
    const response = await api.put(`/evaluaciones/${evaluacion.cod_evaluacion}`, evaluacion);
    return response.data;
  },

  // Eliminar una evaluación
  delete: async (codEvaluacion: number): Promise<void> => {
    await api.delete(`/evaluaciones/${codEvaluacion}`);
  },
};

export default api;