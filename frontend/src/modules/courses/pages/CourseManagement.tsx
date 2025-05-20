import { useState, useEffect } from "react";
import { Layout } from '../../layout';
import { cursoService, Curso } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export const CourseManagement = () => {
  const [courses, setCourses] = useState<Curso[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await cursoService.getAll();
      setCourses(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los cursos');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.titulo_curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.descripcion_curso?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/courses/edit/${courseId}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E2E8F0]">Gestión de Cursos</h1>
            <p className="text-[#94A3B8] mt-2">Administra tus cursos y contenido</p>
          </div>
          <Link
            to="/courses/create"
            className="bg-[#46838C] hover:bg-[#2F646D] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <PlusIcon className="w-5 h-5" />
            Crear Nuevo Curso
          </Link>
        </div>

        <div className="bg-[#1E293B] rounded-lg p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0F172A] text-[#E2E8F0] border border-[#334155] focus:border-[#46838C] focus:outline-none"
              />
            </div>
            <select className="px-4 py-2 rounded-lg bg-[#0F172A] text-[#E2E8F0] border border-[#334155] focus:border-[#46838C] focus:outline-none">
              <option value="all">Todos los cursos</option>
              <option value="published">Publicados</option>
              <option value="draft">Borradores</option>
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.cod_curso}
                className="bg-[#0F172A] rounded-lg overflow-hidden border border-[#334155] hover:border-[#46838C] transition-colors"
              >
                <div className="relative h-48">
                  <img
                    src={"https://skoolofcode.us/wp-content/uploads/2022/09/artturi-jalli-g5_rxRjvKmg-unsplash-2048x1536.jpg"}
                    alt={course.titulo_curso}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#E2E8F0] text-lg mb-2">
                    {course.titulo_curso}
                  </h3>
                  <p className="text-sm text-[#94A3B8] line-clamp-2 mb-4">
                    {course.descripcion_curso}
                  </p>
                  <div className="flex items-center justify-between text-sm text-[#64748B] mb-4">
                    <span>0 Módulos</span>
                    <span>0 Estudiantes</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/courses/${course.cod_curso}/edit`}
                      className="flex-1 px-4 py-2 bg-[#334155] text-[#E2E8F0] rounded hover:bg-[#46838C] transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                      Editar
                    </Link>
                    <Link
                      to={`/courses/${course.cod_curso}/stats`}
                      className="flex-1 px-4 py-2 bg-[#334155] text-[#E2E8F0] rounded hover:bg-[#46838C] transition-colors"
                    >
                      <ChartBarIcon className="w-4 h-4" />
                      Estadísticas
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}; 