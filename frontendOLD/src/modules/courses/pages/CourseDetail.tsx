import { useState, useEffect } from "react";
import { Layout } from '../../layout';
import { cursoService, Curso } from "../../../services/api";
import { useParams } from "react-router-dom";
import { CourseProgress } from "../components/CourseProgress";

export const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Curso | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'students'>('overview');

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(Number(courseId));
    }
  }, [courseId]);

  const fetchCourseDetails = async (id: number) => {
    try {
      const data = await cursoService.getById(id);
      setCourse(data);
    } catch (error) {
      console.error("Error al obtener los detalles del curso:", error);
    }
  };

  if (!course) {
    return (
      <Layout>
        <main className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#46838C] mx-auto"></div>
            <p className="text-[#94A3B8] mt-4">Cargando curso...</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="p-6 max-w-7xl mx-auto">
        {/* Header del curso */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src={course.imagen_curso}
            // src={"https://skoolofcode.us/wp-content/uploads/2022/09/artturi-jalli-g5_rxRjvKmg-unsplash-2048x1536.jpg"}
            alt={course.titulo_curso}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{course.titulo_curso}</h1>
            <p className="text-[#E2E8F0]">{course.descripcion_curso}</p>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="border-b border-[#334155] mb-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-medium ${
                activeTab === 'overview'
                  ? 'text-[#46838C] border-b-2 border-[#46838C]'
                  : 'text-[#94A3B8] hover:text-[#E2E8F0]'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`pb-4 px-2 font-medium ${
                activeTab === 'modules'
                  ? 'text-[#46838C] border-b-2 border-[#46838C]'
                  : 'text-[#94A3B8] hover:text-[#E2E8F0]'
              }`}
            >
              Módulos
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`pb-4 px-2 font-medium ${
                activeTab === 'students'
                  ? 'text-[#46838C] border-b-2 border-[#46838C]'
                  : 'text-[#94A3B8] hover:text-[#E2E8F0]'
              }`}
            >
              Estudiantes
            </button>
          </nav>
        </div>

        {/* Contenido de las tabs */}
        <div className="grid grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="col-span-2">
            <div className="bg-[#1E293B] rounded-lg p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">Descripción del Curso</h2>
                    <p className="text-[#94A3B8] leading-relaxed">{course.descripcion_curso}</p>
                  </div>
                </div>
              )}

              {activeTab === 'modules' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#E2E8F0]">Módulos del Curso</h2>
                    <button className="px-4 py-2 bg-[#46838C] text-white rounded hover:bg-[#3A6D75] transition-colors">
                      + Agregar Módulo
                    </button>
                  </div>
                  <div className="text-center py-12 text-[#94A3B8]">
                    No hay módulos disponibles. ¡Comienza agregando el primero!
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#E2E8F0]">Estudiantes Inscritos</h2>
                    <button className="px-4 py-2 bg-[#46838C] text-white rounded hover:bg-[#3A6D75] transition-colors">
                      + Invitar Estudiantes
                    </button>
                  </div>
                  <div className="text-center py-12 text-[#94A3B8]">
                    No hay estudiantes inscritos aún.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Progreso del curso */}
            {courseId && <CourseProgress courseId={Number(courseId)} />}

            {/* Información adicional */}
            <div className="bg-[#1E293B] rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">Información del Curso</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-[#94A3B8] mb-1">Nivel</h3>
                  <p className="text-[#E2E8F0]">Principiante</p>
                </div>
                <div>
                  <h3 className="text-sm text-[#94A3B8] mb-1">Duración Estimada</h3>
                  <p className="text-[#E2E8F0]">8 semanas</p>
                </div>
                <div>
                  <h3 className="text-sm text-[#94A3B8] mb-1">Requisitos</h3>
                  <p className="text-[#E2E8F0]">Ninguno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}; 