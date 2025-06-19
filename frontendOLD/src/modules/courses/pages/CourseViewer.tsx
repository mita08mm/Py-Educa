import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cursoService } from '../../../services/api';
import { CourseProgress } from '../components/CourseProgress';

// Tipos
interface CourseContent {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  sections: Section[];
}

interface Section {
  id: number;
  title: string;
  subsections: Subsection[];
}

interface Subsection {
  id: number;
  title: string;
  content: string;
}

// Componente principal
export const CourseViewer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseContent(parseInt(courseId));
    }
  }, [courseId]);

  const fetchCourseContent = async (id: number) => {
    try {
      setLoading(true);
      // TODO: Implementar llamada real al API
      // Por ahora usamos datos de ejemplo
      const mockCourse: CourseContent = {
        id,
        title: "Introducción a Python",
        description: "Aprende los fundamentos de Python",
        modules: [
          {
            id: 1,
            title: "Fundamentos",
            sections: [
              {
                id: 1,
                title: "Variables y Tipos de Datos",
                subsections: [
                  {
                    id: 1,
                    title: "¿Qué son las variables?",
                    content: "Las variables son contenedores para almacenar valores..."
                  }
                ]
              }
            ]
          }
        ]
      };
      setCourse(mockCourse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el curso');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Curso no encontrado</div>;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E2E8F0] mb-2">{course.title}</h1>
        <p className="text-gray-400">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Contenido del curso */}
          <div className="space-y-6">
            {course.modules.map((module) => (
              <div key={module.id} className="bg-[#1E293B] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#E2E8F0] mb-4">{module.title}</h2>
                <div className="space-y-4">
                  {module.sections.map((section) => (
                    <div key={section.id} className="border-l-2 border-[#46838C] pl-4">
                      <h3 className="text-lg font-medium text-[#E2E8F0] mb-2">{section.title}</h3>
                      <div className="space-y-2">
                        {section.subsections.map((subsection) => (
                          <div key={subsection.id} className="bg-[#0F172A] rounded p-4">
                            <h4 className="text-[#E2E8F0] font-medium mb-2">{subsection.title}</h4>
                            <p className="text-gray-400">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Barra lateral con progreso */}
          {courseId && <CourseProgress courseId={parseInt(courseId)} />}
        </div>
      </div>
    </div>
  );
};
