import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, Curso } from '../../../services/api';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const initialFormData: Curso = {
  titulo_curso: '',
  descripcion_curso: '',
};

export const CourseForm = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [formData, setFormData] = useState<Curso>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseData(parseInt(courseId));
    }
  }, [courseId]);

  const fetchCourseData = async (id: number) => {
    try {
      setLoading(true);
      const response = await cursoService.getCourse(id);
      setFormData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (courseId) {
        await cursoService.updateCourse(parseInt(courseId), formData);
      } else {
        await cursoService.createCourse(formData);
      }
      navigate('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el curso');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {courseId ? 'Editar Curso' : 'Crear Nuevo Curso'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            name="titulo_curso"
            value={formData.titulo_curso}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Descripción"
            name="descripcion_curso"
            value={formData.descripcion_curso}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {courseId ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/courses')}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}; 